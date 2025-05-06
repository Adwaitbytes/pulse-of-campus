
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-pulse-purple font-medium" : "text-foreground/70 hover:text-foreground";
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/colleges', label: 'Colleges' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md bg-background/70">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-20">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pulse-purple to-pulse-teal flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="font-semibold">Pulse of Campus</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm ${isActive(link.path)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <Link
              to="/submit-event"
              className="bg-gradient-to-r from-pulse-purple to-pulse-teal text-white px-4 py-2 rounded text-sm hover:opacity-95"
            >
              Submit Event
            </Link>
            
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground md:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] z-50">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base py-2 ${isActive(link.path)}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      to="/submit-event"
                      className="bg-gradient-to-r from-pulse-purple to-pulse-teal text-white px-4 py-2 rounded text-base hover:opacity-95 block text-center"
                    >
                      Submit Event
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
