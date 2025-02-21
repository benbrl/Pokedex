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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
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

            <div className="w-full ml-20 mr-4 mt-6">
              <h2 className="text-xl font-bold text-center mb-4">Pokémons rencontrés</h2>
              {pkmnSeen.length > 0 ? (
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
              ) : (
                <div className="text-center mt-4">
                  <p>Oups, vous n'avez pas encore rencontré de Pokémon !</p>
                  <Link to="/dashboard" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">
                    Commencer à rencontrer vos premiers Pokémon !
                  </Link>
                </div>
              )}

              <h2 className="text-xl font-bold text-center mt-8 mb-4 text-black">Pokémons capturés</h2>
              {pkmnCatch.length > 0 ? (
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
              ) : (
                <div className="text-center mt-4">
                  <p>Oups, vous n'avez pas encore capturé de Pokémon !</p>
                  <Link to="/dashboard" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">
                    Commencer à capturer vos premiers Pokémon !
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
