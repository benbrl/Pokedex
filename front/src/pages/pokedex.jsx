import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import '../style/font.css';

const Pokedex = () => {
  const [pkmnCatch, setPkmnCatch] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Erreur: ${response.status}`);

        const data = await response.json();
        setPkmnCatch(data.pkmnCatch || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon capturés:", error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      {pkmnCatch.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pkmnCatch.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon._id} className="block">
              <PokemonCard
                name={pokemon.name}
                type1={pokemon.types[0]}
                type2={pokemon.types[1] || ""}
                imageUrl={pokemon.imgUrl}
              
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center space-y-4">
            <p className="font-bold text-xl text-gray-800">Encore aucun Pokémon capturé !</p>
            <p className="text-gray-600 text-lg shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow">
              Psst ! Va dans l'onglet Recherche pour capturer et voir des Pokémon :)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokedex;
