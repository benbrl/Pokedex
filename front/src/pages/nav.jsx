import React from 'react';
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700 fixed">
            <nav className="flex flex-col flex-1 space-y-6">
                <Link to="/dashboard" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <HomeIcon className="w-6 h-6" />
                </Link>

             
                <Link to="/search" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                </Link>
            </nav>

            <div className="flex flex-col space-y-6">
                

                <Link to="/profile" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <UserIcon className="w-6 h-6" />
                </Link>

                <Link to="/logout" onClick={() => localStorage.removeItem("jwt")} className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                </Link>
            
            </div>
        </aside>
    );
};

export default Navbar;
