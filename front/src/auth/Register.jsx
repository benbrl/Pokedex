import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/auth'; // Assurez-vous que le chemin est correct
import '../style/style.css';

const Register = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const data = await register(username, email, password);
            if (data) {
                // Rediriger ou effectuer une action après une inscription réussie
                console.log("Inscription réussie:", data);
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pokeball background-blue">
            <div className="w-full max-w-md p-8 rounded-lg">
                <img src="./pokemon-logo.png" alt="Pokemon Logo" className="mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full bg-white px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="w-full bg-white  px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-3 bg-white py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        S'inscrire
                    </button>
                </form>
                <div className="mt-4 w-full">
                    <Link to="/login" className="block bg-gray-300 hover:bg-gray-400 focus:outline-none text-gray-700 w-full py-2 mt-2 rounded-lg text-center">
                        Déjà un compte ? Connectez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
