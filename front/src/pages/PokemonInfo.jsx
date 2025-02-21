import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SpeakerWaveIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import "../style/PokemonInfo.css";

const PokemonInfo = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSeen, setIsSeen] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/api/pkmn/${name}`);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);

        const data = await response.json();
        setPokemon(data.pokemon);
      } catch (error) {
        console.error("Erreur lors de la récupération du Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

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
          throw new Error(`Erreur: ${response.status}`);
        } else {
          const data = await response.json();

          const seenSet = new Set(data.pkmnSeen.map((pkmn) => pkmn._id));
          const capturedSet = new Set(data.pkmnCatch.map((pkmn) => pkmn._id));

          setIsSeen(seenSet.has(pokemon?._id));
          setIsCaptured(capturedSet.has(pokemon?._id));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };

    fetchPokemon();
    fetchProfile();
  }, [name, pokemon]);

  if (loading) return <p>Chargement...</p>;
  if (!pokemon) return <p>Pokémon introuvable.</p>;

  const handleMarkAsSeen = async () => {
    await updatePokemonStatus(pokemon._id, true, false);
    setIsSeen(true);
  };

  const handleCatchPokemon = async () => {
    await updatePokemonStatus(pokemon._id, true, true);
    setIsCaptured(true);
  };

  const updatePokemonStatus = async (pokemonId, isSeen, isCaptured) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Vous devez être connecté pour voir ou attraper un Pokémon.");
      return;
    }

    const data = new URLSearchParams();
    data.append("pokemonId", pokemonId);
    data.append("isCaptured", isCaptured);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${token}`,
        },
        body: data.toString(),
      });

      if (response.ok) {
        setMessage(isCaptured ? "Pokémon attrapé ! 🎉" : "Pokémon vu ! 👀");
      } else {
        const errorMessage = await response.text();
        console.error("Erreur API:", errorMessage);
        setMessage(`Erreur: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      setMessage("Problème de connexion au serveur.");
    }
  };

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

  function getColorByType(type) {
    return PkmnTypeColors[type] || "#FFFFFF";
  }

  const color = getColorByType(pokemon.types[0]);

  const audio = new Audio(pokemon.soundUrl);

  const isLoggedIn = !!localStorage.getItem("jwt");

  return (
    <div className="flex flex-col md:flex-row items-center min-h-screen" style={{ backgroundColor: color }}>
      <div className="flex flex-col items-center md:items-start p-4 md:w-1/2 mb-4 md:mb-0 h-screen">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate(-1)} className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white ml-2">{pokemon.name}</h1>
        </div>

        <div className="flex mb-4">
          {pokemon.types.map((type, index) => (
            <span key={index} className="pokemon-type text-white px-4 py-2 rounded mr-2">
              {type}
            </span>
          ))}
        </div>
        <img src="../public/pokeball2.png" className=" pokeball-position object-cover" />
        <img src={pokemon.imgUrl} alt={pokemon.name} className="img-position object-cover" />
      </div>

      <div className="md:w-1/2 p-4 bg-white rounded-l-3xl md:ml-4 h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Informations</h2>
          <button className="p-2 bg-gray-200 rounded-full" onClick={() => audio.play()}>
            <SpeakerWaveIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <p className="text-gray-700">{pokemon.description}</p>

        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-gray-800 font-semibold">
            Régions : {pokemon.regions.map(region => region.regionName).join(", ")}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-gray-800 font-semibold">Taille: {pokemon.height / 10} M</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-gray-800 font-semibold">Poids: {pokemon.weight / 10} KG</p>
        </div>

        {isLoggedIn ? (
          <>
            <button
              onClick={handleMarkAsSeen}
              disabled={isSeen}
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2 ${isSeen ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              👀 {isSeen ? 'Vu' : 'Voir le Pokémon'}
            </button>

            <button
              onClick={handleCatchPokemon}
              disabled={isCaptured}
              className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 ${isCaptured ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              🎯 {isCaptured ? 'Capturé' : 'Attraper le Pokémon'}
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
          >
          Connectez vous pour voir ou attraper le Pokémon
          </button>
        )}

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default PokemonInfo;
