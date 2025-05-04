
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-8 space-y-6 mb-10 md:mb-0 z-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pulse-purple to-pulse-teal bg-clip-text text-transparent">
                Discover Campus Events
              </span> 
              <br />That Matter to You
            </h1>
            
            <p className="text-lg text-foreground/80">
              Your all-in-one platform to find and share tech talks, hackathons, and workshops
              from colleges across the country. Never miss an opportunity again!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="bg-pulse-purple hover:bg-pulse-purple/90">
                <Link to="/events" className="flex items-center gap-2">
                  <Search size={18} />
                  <span>Explore Events</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-pulse-teal text-pulse-teal hover:bg-pulse-teal/10">
                <Link to="/submit-event" className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Submit Event</span>
                </Link>
              </Button>
            </div>
            
            <div className="pt-4 text-sm text-foreground/60">
              <p>Already hosting 3,000+ events from 150+ colleges</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square md:aspect-[4/3] animate-float">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pulse-purple/20 to-pulse-teal/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-4 glass rounded-2xl overflow-hidden border border-white/40 shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="College Events" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-1">Featured Events</h3>
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-pulse-purple/20 text-pulse-purple rounded-full">Hackathons</span>
                      <span className="text-xs px-2 py-1 bg-pulse-teal/20 text-pulse-teal rounded-full">Tech Talks</span>
                      <span className="text-xs px-2 py-1 bg-pulse-orange/20 text-pulse-orange rounded-full">Workshops</span>
                    </div>
                    <div className="text-xs text-foreground/70">From top universities across the country</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
