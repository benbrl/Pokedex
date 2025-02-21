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

    fetchPokemon();
  }, [name]);

  if (loading) return <p>Chargement...</p>;
  if (!pokemon) return <p>Pokémon introuvable.</p>;

  const handleMarkAsSeen = async () => {
    await updatePokemonStatus(pokemon._id, true, false);
  };

  const handleCatchPokemon = async () => {
    await updatePokemonStatus(pokemon._id, true, true);
  };

  const updatePokemonStatus = async (pokemonId, isSeen, isCaptured) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Vous devez être connecté pour voir ou attraper un Pokémon.");
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("pokemonId", pokemonId);
    urlencoded.append("isCaptured", isCaptured);

    try {
      const response = await fetch("http://localhost:3000/trainer/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: urlencoded,
      });

      if (response.ok) {
        setMessage(isCaptured ? "Pokémon attrapé ! 🎉" : "Pokémon vu ! 👀");
      } else {
        setMessage("Erreur lors de la mise à jour du statut.");
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

        <button
          onClick={handleMarkAsSeen}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2"
        >
          👀 Voir le Pokémon
        </button>

        <button
          onClick={handleCatchPokemon}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          🎯 Attraper le Pokémon
        </button>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default PokemonInfo;
