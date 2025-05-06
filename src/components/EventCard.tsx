
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ExternalLink, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  college: string;
  type: 'hackathon' | 'tech-talk' | 'workshop' | 'social' | 'other';
  image?: string;
  eventUrl?: string;
}

interface EventCardProps {
  event: EventType;
  index: number;
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'hackathon':
      return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none shadow-lg shadow-purple-500/20';
    case 'tech-talk':
      return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none shadow-lg shadow-blue-500/20';
    case 'workshop':
      return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-lg shadow-orange-500/20';
    case 'social':
      return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-none shadow-lg shadow-pink-500/20';
    default:
      return 'bg-gradient-to-r from-slate-500 to-gray-600 text-white border-none shadow-lg shadow-gray-500/20';
  }
};

// Reliable placeholder images that will always work
const placeholderImages = [
  'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop'
];

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  // Convert date string to Date object
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Get a placeholder image based on event id or index to ensure consistency
  const getPlaceholderImage = () => {
    const imageIndex = Math.abs(parseInt(event.id, 10) || index) % placeholderImages.length;
    return placeholderImages[imageIndex];
  };
  
  // Handle image error by replacing with a placeholder
  const handleImageError = () => {
    console.log("Image failed to load, using placeholder");
    setImageError(true);
  };

  // External link handler
  const handleExternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (event.eventUrl) {
      window.open(event.eventUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Details button handler
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/event/${event.id}`);
  };

  const imageToUse = imageError || !event.image ? getPlaceholderImage() : event.image;

  // Determine if the event is upcoming
  const isUpcoming = new Date(event.date) > new Date();

  // Calculate days remaining for upcoming events
  const daysRemaining = isUpcoming 
    ? Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card className="event-card overflow-hidden h-full border-0 shadow-xl bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl">
      <div className="relative h-56 overflow-hidden rounded-t-3xl bg-gray-900">
        <div className="absolute top-3 left-3 z-10">
          <Badge className={`${getEventTypeColor(event.type)} px-3 py-1.5 text-sm font-medium`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
        
        {isUpcoming && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none shadow-lg shadow-orange-500/20 px-3 py-1.5">
              {daysRemaining === 0 ? "Today!" : `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} left`}
            </Badge>
          </div>
        )}
        
        <img 
          src={imageToUse}
          alt={event.title} 
          onError={handleImageError}
          className="w-full h-full object-cover object-center" 
          loading="eager"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {event.eventUrl && (
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:shadow-lg"
              onClick={handleExternalLink}
            >
              <span>Visit Event</span> <ExternalLink size={16} />
            </Button>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-5">
        <h3 className="text-xl font-bold line-clamp-2">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-2 z-10">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Calendar size={12} />
            </div>
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
              <Clock size={12} />
            </div>
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <div className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600">
              <MapPin size={12} />
            </div>
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-100 pt-4 mt-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <User size={12} />
          </div>
          <span>{event.college}</span>
        </div>
        
        {/* Always show a button for clear action */}
        {event.eventUrl ? (
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            size="sm"
            onClick={handleExternalLink}
          >
            Visit Event <ExternalLink size={14} className="ml-1" />
          </Button>
        ) : (
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            size="sm"
            onClick={handleDetailsClick}
          >
            See Details <ArrowRight size={14} className="ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
