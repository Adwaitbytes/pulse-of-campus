
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, ArrowLeft, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <AnimatedBackground>
        <Navbar />
        <main className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Events
            </Link>
          </Button>
        </main>
      </AnimatedBackground>
    );
  }
  
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-pulse-purple text-white';
      case 'tech-talk':
        return 'bg-pulse-teal text-white';
      case 'workshop':
        return 'bg-pulse-orange text-white';
      case 'social':
        return 'bg-pulse-pink text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  const handleRegisterClick = () => {
    if (event.eventUrl) {
      window.open(event.eventUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/events" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Events
            </Link>
          </Button>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Badge className={`${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <h1 className="text-3xl font-bold">{event.title}</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-6">
              <img 
                src={event.image || `/placeholder.svg`} 
                alt={event.title} 
                className="w-full h-64 object-cover object-center" 
              />
            </div>
            
            <div className="glass rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-foreground/90 whitespace-pre-line">{event.description}</p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 mb-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-pulse-purple mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Date</h3>
                    <p className="text-foreground/70">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-pulse-teal mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p className="text-foreground/70">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-pulse-orange mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-foreground/70">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="text-pulse-pink mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Hosted By</h3>
                    <p className="text-foreground/70">{event.college}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-pulse-purple to-pulse-teal hover:opacity-95 flex items-center justify-center gap-2"
                  onClick={handleRegisterClick}
                >
                  Register for Event <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/70">
          © 2025 Pulse of Campus. All rights reserved.
        </div>
      </footer>
    </AnimatedBackground>
  );
};

export default EventDetail;
