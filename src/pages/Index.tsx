
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventsList from '@/components/EventsList';
import { useEvents } from '@/contexts/EventContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { events, loading } = useEvents();
  
  // Get featured events (most recent 3)
  const featuredEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // Get counts by event type for stats
  const eventCounts = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="min-h-screen">
        <HeroSection />
        
        {/* Featured Events Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Events</h2>
              <p className="text-muted-foreground">Don't miss these upcoming opportunities</p>
            </div>
            <Button asChild variant="outline" className="text-pulse-purple">
              <Link to="/events" className="flex items-center gap-1">
                View All <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <EventsList events={featuredEvents} loading={loading} />
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-pulse-purple/5 to-pulse-teal/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Platform Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-4xl font-bold mb-2 text-pulse-purple">{events.length}</h3>
                <p className="text-foreground/70">Total Events</p>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h3 className="text-4xl font-bold mb-2 text-pulse-teal">
                  {Object.keys(events.reduce((acc, event) => {
                    acc[event.college] = true;
                    return acc;
                  }, {} as Record<string, boolean>)).length}
                </h3>
                <p className="text-foreground/70">Colleges & Universities</p>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <div className="flex gap-2 flex-wrap mb-2">
                  {Object.entries(eventCounts).map(([type, count]) => (
                    <Badge key={type} variant="secondary">
                      {type}: {count}
                    </Badge>
                  ))}
                </div>
                <p className="text-foreground/70">Event Types</p>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h3 className="text-4xl font-bold mb-2 text-pulse-pink">24/7</h3>
                <p className="text-foreground/70">Event Discovery</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Share Your Event?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Promote your hackathon, tech talk, workshop or other campus event to reach more students
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-pulse-purple to-pulse-teal hover:opacity-95">
              <Link to="/submit-event">Submit Your Event</Link>
            </Button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pulse-purple to-pulse-teal flex items-center justify-center text-white font-bold text-lg">
                  P
                </div>
                <span className="font-semibold">Pulse of Campus</span>
              </div>
              
              <div className="text-sm text-foreground/70">
                © 2025 Pulse of Campus. All rights reserved.
              </div>
              
              <div className="flex gap-4">
                <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground">
                  About
                </Link>
                <Link to="/privacy" className="text-sm text-foreground/70 hover:text-foreground">
                  Privacy
                </Link>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </AnimatedBackground>
  );
};

export default Index;
