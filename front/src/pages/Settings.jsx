import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../style/font.css";

const Settings = () => {
  const [trainerName, setTrainerName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [trainerMessage, setTrainerMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Aucun token trouvé, veuillez vous reconnecter.");
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrainerName(data.trainerName || "Sacha");
        setImgUrl(data.imgUrl || "");
        setEmail(data.email || "");
      })
      .catch((error) => console.error("Erreur de récupération :", error));
  }, []);

  const handleUserUpdate = (e) => {
    e.preventDefault();
    setMessage(`Nouvelle email : ${email} et nouveau mot de passe modifié ! (Test uniquement)`);
  };

  const handleTrainerUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) {
      setTrainerMessage("Vous devez être connecté pour modifier vos informations.");
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("trainerName", trainerName);
    urlencoded.append("imgUrl", imgUrl);

    fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: urlencoded,
    })
      .then((response) => response.json())
      .then(() => setTrainerMessage("Mise à jour réussie !"))
      .catch((error) => console.error("Erreur lors de la mise à jour :", error));
  };

  const handleDeleteTrainer = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setTrainerMessage("Vous devez être connecté pour supprimer vos informations.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_SERVER_URL_APP}/trainer/`, requestOptions)
      .then((response) => response.text())
      .then(() => {
        setTrainerMessage("Suppression réussie !");
        navigate("/profile");
      })
      .catch((error) => console.error("Erreur lors de la suppression :", error));
  };

  return (
    <div className="flex h-screen">
      <Navbar />

      <div className="ms-16 min-h-screen flex flex-col items-start p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      
        <div className="flex flex-col md:flex-row gap-6 w-full">
      
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">User</h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleUserUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Modifier votre adresse email :
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  placeholder={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Modifier votre mot de passe :
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  placeholder="Nouveau mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Enregistrer les modifications
              </button>
            </form>
          </div>

          {/* Bloc Trainer */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Trainer</h2>
            {trainerMessage && <p className="text-green-500 mb-4">{trainerMessage}</p>}
            <form onSubmit={handleTrainerUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Modifier les informations du dresseur :
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  placeholder="Nom du dresseur"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Modifier votre image de profil :
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  placeholder="URL de l'image"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Enregistrer les modifications
              </button>
            </form>

            <button
              onClick={() => setShowDeletePopup(true)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
            >
              Supprimer le dresseur
            </button>
          </div>
        </div>

        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce dresseur ?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteTrainer}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/profile")}
          className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 mt-6"
        >
          Sauvegarder et quitter
        </button>
      </div>
    </div>
  );
};

export default Settings;
