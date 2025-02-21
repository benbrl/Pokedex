import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import PokemonInfo from "./pages/PokemonInfo";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>}
        />
        <Route
          path="/pokedex"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>}
        />

        <Route path="/pokemon/:name" element={<ProtectedRoute><PokemonInfo /></ProtectedRoute>} />

     

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>}
        />
        <Route path="*" element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;

