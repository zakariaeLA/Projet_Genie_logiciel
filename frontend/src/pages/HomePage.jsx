import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
        <p className="text-lg text-gray-600">Explorez et naviguez facilement.</p>

        {/* Arrow Icon Container */}
        <Link to="/chat" className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-4 hover:bg-gray-300 transition">
          <ChevronRight className="w-8 h-8 text-black" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
