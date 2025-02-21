import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import PokemonInfo from "./pages/PokemonInfo";
import Pokedex from "./pages/pokedex";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={

          <Dashboard />
        }
        />
        <Route
          path="/pokedex"
          element={
            <ProtectedRoute>
              <Pokedex />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>}
        />

        <Route path="/pokemon/:name" element={<PokemonInfo />} />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>}
        />
        <Route path="*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;

