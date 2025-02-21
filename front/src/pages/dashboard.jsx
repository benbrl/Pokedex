import React from 'react';
import Navbar from '../components/Navbar';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("jwt");

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-4 ml-20">
        <div className="flex justify-between items-center mb-4">
          <h1>Dashboard</h1>
          {!isLoggedIn && (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Connexion
            </button>
          )}
        </div>
        <Search />
      </div>
    </div>
  );
};

export default Dashboard;
