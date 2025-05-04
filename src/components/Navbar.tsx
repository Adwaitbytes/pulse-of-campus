
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-pulse-purple font-medium" : "text-foreground/70 hover:text-foreground";
  };

  return (
    <header className="sticky top-0 z-10 border-b backdrop-blur-md bg-background/70">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pulse-purple to-pulse-teal flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="font-semibold">Pulse of Campus</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/events" className={`text-sm ${isActive('/events')}`}>
              Events
            </Link>
            <Link to="/colleges" className={`text-sm ${isActive('/colleges')}`}>
              Colleges
            </Link>
            <Link to="/about" className={`text-sm ${isActive('/about')}`}>
              About
            </Link>
          </nav>
          
          <Link
            to="/submit-event"
            className="bg-gradient-to-r from-pulse-purple to-pulse-teal text-white px-4 py-2 rounded text-sm hover:opacity-95 transition-opacity"
          >
            Submit Event
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
