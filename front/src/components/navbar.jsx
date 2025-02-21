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

                <Link to="/pokedex" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <circle cx="12" cy="12" r="8" />
                        <circle cx="12" cy="12" r="2" />
                        <line x1="4" y1="12" x2="10" y2="12" />
                        <line x1="14" y1="12" x2="20" y2="12" />
                    </svg>
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
