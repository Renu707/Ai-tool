
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">AI Compass</span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-primary-600 font-medium">Home</a>
          <a href="#categories" className="text-gray-600 hover:text-primary-600 font-medium">Categories</a>
          <a href="#trending" className="text-gray-600 hover:text-primary-600 font-medium">Trending</a>
          <a href="#newest" className="text-gray-600 hover:text-primary-600 font-medium">New</a>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Search size={16} />
            <span>Search</span>
          </Button>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 text-gray-600"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <a href="/" className="text-gray-600 py-2 hover:text-primary-600 font-medium">Home</a>
            <a href="#categories" className="text-gray-600 py-2 hover:text-primary-600 font-medium">Categories</a>
            <a href="#trending" className="text-gray-600 py-2 hover:text-primary-600 font-medium">Trending</a>
            <a href="#newest" className="text-gray-600 py-2 hover:text-primary-600 font-medium">New</a>
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2">
              <Search size={16} />
              <span>Search</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
