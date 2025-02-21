import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';

const Profile = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trainerName, setTrainerName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [formVisible, setTrainerFormVisible] = useState(false);

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

  const handleCreateTrainer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Token introuvable, veuillez vous reconnecter.");

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ trainerName, imgUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setTrainer(data);
        setTrainerFormVisible(false);
      } else {
        throw new Error(`Erreur: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création du profil:", error);
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement...</p>;

  const { pkmnSeen = [], pkmnCatch = [], creationDate } = trainer || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="ms-8 relative flex flex-col items-center p-6 min-h-screen w-full">
        <Link to="/settings" className="absolute top-4 right-4 p-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
          ⚙️
        </Link>

        {formVisible ? (
          <form onSubmit={handleCreateTrainer} className="p-6 flex flex-col items-center w-full max-w-md">
            <h1 className="text-2xl font-bold mt-4">Créer un Dresseur</h1>
            <input
              type="text"
              placeholder="Nom du Dresseur"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="border p-2 rounded mt-4 w-full"
              required
            />
            <input
              type="url"
              placeholder="URL de l'image"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="border p-2 rounded mt-4 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">Créer</button>
          </form>
        ) : (
          <>
            <div className="p-6 flex flex-col items-center w-full max-w-md">
              {trainer?.imgUrl ? (
                <img
                  src={trainer.imgUrl}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-lg flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Aucune Image</span>
                </div>
              )}

              <h1 className="text-2xl font-bold mt-4">{trainer?.trainerName || "Dresseur inconnu"}</h1>
              <p className="text-gray-600">
                {creationDate ? `Dresseur Pokémon depuis le ${formatDate(creationDate)}` : "Nouveau dresseur, créez votre profil !"}
              </p>
            </div>

            <div className="w-full max-w-3xl mt-6">
              <h2 className="text-xl font-bold text-center mb-4">Pokémons rencontrés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pkmnSeen.map((pokemon) => (
                  <Link to={`/pokemon/${pokemon.name}`} key={pokemon._id} className="block">
                    <PokemonCard
                      name={pokemon.name}
                      type1={pokemon.types[0]}
                      type2={pokemon.types[1] || ""}
                      imageUrl={pokemon.imgUrl}
                      className="max-w-xs mx-auto"
                    />
                  </Link>
                ))}
              </div>

              <h2 className="text-xl font-bold text-center mt-8 mb-4 text-black">Pokémons capturés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pkmnCatch.map((pokemon) => (
                  <Link to={`/pokemon/${pokemon.name}`} key={pokemon._id} className="block">
                    <PokemonCard
                      name={pokemon.name}
                      type1={pokemon.types[0]}
                      type2={pokemon.types[1] || ""}
                      imageUrl={pokemon.imgUrl}
                      className="max-w-xs mx-auto"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
