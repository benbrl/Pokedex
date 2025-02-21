import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../style/pokecard.css';
import Navbar from '../components/navbar';
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

  const handleSearch = async (page = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/api/pkmn/search?partialName=${partialName}&typeOne=${typeOne}&typeTwo=${typeTwo}&page=${page}&size=${itemsPerPage}`);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPokemonList(data.data);
        setTotalItems(data.totalItems || 0);
      } else {
        console.error('Expected an array in data property but received:', data);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button border p-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleToggleSeen = async (pokemonId) => {
    const isSeen = seenPokemon[pokemonId];
    setSeenPokemon({ ...seenPokemon, [pokemonId]: !isSeen });
    await updatePokemonStatus(pokemonId, !isSeen, false);
  };

  const handleToggleCaptured = async (pokemonId) => {
    const isCaptured = capturedPokemon[pokemonId];
    setCapturedPokemon({ ...capturedPokemon, [pokemonId]: !isCaptured });
    await updatePokemonStatus(pokemonId, true, !isCaptured);
  };

  const updatePokemonStatus = async (pokemonId, isSeen, isCaptured) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Vous devez être connecté pour voir ou attraper un Pokémon.");
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("pokemonId", pokemonId);
    urlencoded.append("isCaptured", isCaptured);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: urlencoded,
      });

      if (!response.ok) {
        console.error("Erreur lors de la mise à jour du statut.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (

      <div className="ms-8 pokemon-search-container flex-1 p-4">
        <div className="search-form flex flex-col md:flex-row gap-4 mb-6 w-full max-w-lg mx-auto">
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
          <input
            type="number"
            placeholder="Items per Page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            min="1"
            className="items-per-page border p-2 rounded"
          />
          <button onClick={() => handleSearch(1)} className="search-button border p-2 rounded bg-blue-500 text-white">Search</button>
        </div>
        <div className="ml-20 mr-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(pokemonList) && pokemonList.map((pokemon) => (
            <div key={pokemon._id} className="relative block">
              <Link to={`/pokemon/${pokemon.name}`}>
                <PokemonCard
                  name={pokemon.name}
                  type1={pokemon.types[0]}
                  type2={pokemon.types[1]}
                  imageUrl={pokemon.imgUrl}
                />
              </Link>
              <div className="absolute bottom-0 left-0 flex space-x-2 p-2">
                <button onClick={() => handleToggleSeen(pokemon._id)} className="text-lg">
                  {seenPokemon[pokemon._id] ? '👀' : '👁️'}
                </button>
                <button onClick={() => handleToggleCaptured(pokemon._id)} className="text-lg">
                  {capturedPokemon[pokemon._id] ? '📕' : '📘'}
                </button>
              </div>
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
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button border p-2 rounded bg-white text-blue-500 mb-8"
          >
            Suivant
          </button>
        </div>
      </div>
  
  );
};

export default PokemonSearch;
