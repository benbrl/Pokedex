import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../style/pokecard.css';
import { Link } from 'react-router-dom';

const PkmnTypeColors = {
  "normal": "#A8A878",
  "fire": "#FD6C6C",
  "water": "#76BDFB",
  "grass": "#78C850",
  "electric": "#FED86E",
  "ice": "#98D8D8",
  "fighting": "#C03028",
  "poison": "#A040A0",
  "ground": "#E0C068",
  "flying": "#A890F0",
  "psychic": "#F85888",
  "bug": "#A8B820",
  "rock": "#B8A038",
  "ghost": "#705898",
  "dragon": "#7038F8",
  "dark": "#705848",
  "steel": "#B8B8D0",
  "fairy": "#EE99AC"
};

const PokemonSearch = () => {
  const [partialName, setPartialName] = useState('');
  const [typeOne, setTypeOne] = useState('');
  const [typeTwo, setTypeTwo] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [seenPokemon, setSeenPokemon] = useState({});
  const [capturedPokemon, setCapturedPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [trainerFormVisible, setTrainerFormVisible] = useState(false);
  const [trainer, setTrainer] = useState(null);

  const handleSearch = async (page = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/api/pkmn/search?partialName=${partialName}&typeOne=${typeOne}&typeTwo=${typeTwo}&page=${page}&size=${itemsPerPage}`);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPokemonList(data.data);
        setTotalItems(data.totalItems || 0);
      } else {
        console.error("Ce n'est pas un tableau", data);
      }
    } catch (error) {
      console.error('Erreur dans le fetch Pokémon:', error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("Token introuvable, veuillez vous reconnecter.");

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setTrainerFormVisible(true);
          } else {
            throw new Error(`Erreur: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setTrainer(data);
          setTrainerFormVisible(false);

          // Mettre à jour les états des Pokémon vus et capturés
          const seenSet = new Set(data.pkmnSeen.map((pkmn) => pkmn._id));
          const capturedSet = new Set(data.pkmnCatch.map((pkmn) => pkmn._id));

          setSeenPokemon((prevSeen) => ({
            ...prevSeen,
            ...Object.fromEntries(Array.from(seenSet, (id) => [id, true])),
          }));

          setCapturedPokemon((prevCaptured) => ({
            ...prevCaptured,
            ...Object.fromEntries(Array.from(capturedSet, (id) => [id, true])),
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        setTrainerFormVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleCapture = async (pokemonId) => {
    if (capturedPokemon[pokemonId]) return; // Empêche le toggle si déjà capturé

    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Token introuvable, veuillez vous reconnecter.");

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/capture/${pokemonId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Erreur: ${response.status}`);

      // Mettre à jour l'état local des Pokémon capturés
      setCapturedPokemon((prevCaptured) => ({
        ...prevCaptured,
        [pokemonId]: true,
      }));
    } catch (error) {
      console.error("Erreur lors de la capture du Pokémon:", error);
    }
  };

  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMarkSeen = async (pokemonId) => {
    if (seenPokemon[pokemonId]) return; // Si déjà vu, ne rien faire

    setSeenPokemon((prevSeen) => ({
      ...prevSeen,
      [pokemonId]: true,
    }));
    await updatePokemonStatus(pokemonId, true, capturedPokemon[pokemonId] || false);
  };

  const handleToggleCaptured = async (pokemonId) => {
    const isCaptured = !capturedPokemon[pokemonId];
    setCapturedPokemon((prevCaptured) => ({
      ...prevCaptured,
      [pokemonId]: isCaptured,
    }));
    await updatePokemonStatus(pokemonId, seenPokemon[pokemonId] || false, isCaptured);
  };

  const updatePokemonStatus = async (pokemonId, isSeen, isCaptured) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Vous devez être connecté pour voir ou attraper un Pokémon.");
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("pokemonId", pokemonId);
    urlencoded.append("isSeen", isSeen.toString());
    urlencoded.append("isCaptured", isCaptured.toString());

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${token}`,
        },
        body: urlencoded,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur lors de la mise à jour du statut:", errorText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const isLoggedIn = !!localStorage.getItem("jwt");

  return (
    <div className="flex h-screen">
      <div className="ml-20 mr-4 w-full">
        <form
          className="search-form flex flex-col md:flex-row gap-4 mb-6 w-full max-w-lg mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(1);
          }}
        >
          <input
            type="text"
            placeholder="Recherche"
            value={partialName}
            onChange={(e) => setPartialName(e.target.value)}
            className="search-input flex-1 border p-2 rounded"
          />
          <select value={typeOne} onChange={(e) => setTypeOne(e.target.value)} className="search-select border p-2 rounded">
            <option value="">Type 1</option>
            {Object.keys(PkmnTypeColors).map((type) => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
          <select value={typeTwo} onChange={(e) => setTypeTwo(e.target.value)} className="search-select border p-2 rounded">
            <option value="">Type 2</option>
            {Object.keys(PkmnTypeColors).map((type) => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
          <button type="submit" className="search-button border p-2 rounded bg-blue-500 text-white">Search</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pokemonList.map((pokemon) => (
            <div key={pokemon._id} className="relative block">
              <Link to={`/pokemon/${pokemon.name}`}>
                <PokemonCard
                  name={pokemon.name}
                  type1={pokemon.types[0]}
                  type2={pokemon.types[1]}
                  imageUrl={pokemon.imgUrl}
                />
              </Link>
              {isLoggedIn && (
                <div className="absolute bottom-0 left-0 flex space-x-2 p-2">
                  <button
                    onClick={() => handleMarkSeen(pokemon._id)}
                    disabled={seenPokemon[pokemon._id]}
                    className={`text-lg ${seenPokemon[pokemon._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {seenPokemon[pokemon._id] ? '✅ Vu' : '👁️ Voir'}
                  </button>
                  <button
                    onClick={() => handleToggleCaptured(pokemon._id)}
                    disabled={capturedPokemon[pokemon._id]}
                    className={`text-lg ${capturedPokemon[pokemon._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {capturedPokemon[pokemon._id] ? '📕 Capturé' : '📘 Attraper'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pagination flex justify-center gap-2 mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button border p-2 rounded bg-white text-blue-500 mb-8"
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`pagination-button border p-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button border p-2 rounded bg-white text-blue-500 mb-8"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
