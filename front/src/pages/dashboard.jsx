import React from 'react';
import Navbar from '../components/navbar';
import Search from './Search';


const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="ms-8 flex-1 p-4">
        <div className="">
          <Search/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
