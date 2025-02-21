import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import '../style/font.css';
import Navbar from '../components/Navbar';

const Pokedex = () => {
  const [pkmnCatch, setPkmnCatch] = useState([]);
  const navigate = useNavigate();

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

  const isLoggedIn = !!localStorage.getItem("jwt");

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="ml-20 mr-4 w-full">
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
              <p className="text-gray-600 text-lg rounded-lg p-4">
                Psst ! Va dans l'onglet Recherche pour capturer et voir des Pokémon :)
              </p>
              {!isLoggedIn && (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
                >
                  Se connecter pour voir les Pokémon capturés
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
