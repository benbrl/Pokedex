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
    <div >
      <h1>Pokedex</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pkmnCatch.length > 0 ? (
          pkmnCatch.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon._id} className="block">
              <PokemonCard
                name={pokemon.name}
                type1={pokemon.types[0]}
                type2={pokemon.types[1] || ""}
                imageUrl={pokemon.imgUrl}
                secondImageUrl="./pokeball2.png"
              />
            </Link>
          ))
        ) : (
          <div>
            <p>Encore aucun Pokémon capturé !</p>
            <p>Psst ! Va dans l'onglet Recherche pour capturer et voir tes premiers Pokémon ;)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
