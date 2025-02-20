import React from 'react';
import Navbar from './nav';
import Pokedex from './pokedex';


const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="ms-8 flex-1 p-4">
        <div className="container mx-auto">
   
            <Pokedex/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
