
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 glass px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pulse-purple to-pulse-teal flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-pulse-purple to-pulse-teal text-transparent bg-clip-text">
            Pulse of Campus
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-foreground/80 hover:text-foreground transition-colors">
            Events
          </Link>
          <Link to="/colleges" className="text-foreground/80 hover:text-foreground transition-colors">
            Colleges
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <Button asChild className="bg-gradient-to-r from-pulse-purple to-pulse-teal hover:opacity-90 transition-opacity">
          <Link to="/submit-event" className="flex items-center gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Submit Event</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
