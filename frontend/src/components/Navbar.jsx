import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">AnalytiXStocks</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link to="/analysis" className="text-gray-700 hover:text-primary transition-colors">
              Analysis
            </Link>
            <Link to="/watchlist" className="text-gray-700 hover:text-primary transition-colors">
              Watchlist
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 