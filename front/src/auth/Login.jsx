import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import '../style/style.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/dashboard"); // Redirection après connexion
    } else {
      setErrorMessage("Échec de connexion, vérifiez vos identifiants.");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-pokeball background-blue">
      <div className="w-full max-w-md">
        <img src="./pokemon-logo.png" alt="Pokemon Logo" className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Connexion
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg mt-4 bg-white"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-4">
  <Link to="/register" className="block w-full text-center bg-gray-300 hover:bg-gray-400 focus:outline-none text-gray-700 py-2 mt-2 rounded-lg">
    Pas encore de compte ? Inscrivez-vous !
  </Link>
</div>

      </div >
    </div >
  );
};


export default Login;
