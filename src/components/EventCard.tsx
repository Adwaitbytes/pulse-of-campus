
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ExternalLink } from 'lucide-react';
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

// Reliable placeholder images that will always work
const placeholderImages = [
  'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop'
];

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const [imageError, setImageError] = useState(false);
  
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
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const imageToUse = imageError || !event.image ? getPlaceholderImage() : event.image;

  return (
    <Card 
      className="event-card overflow-hidden h-full animate-in border-2 hover:border-pulse-purple/50 shadow-lg bg-white"
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <div className={`absolute top-3 right-3 z-10`}>
          <Badge className={`${getEventTypeColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
        <img 
          src={imageToUse}
          alt={event.title} 
          onError={handleImageError}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500" 
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-1/2"></div>
      </div>

      <CardHeader className="pb-2 bg-white">
        <Link to={`/event/${event.id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-pulse-purple">{event.title}</h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-2 bg-white z-10">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
        
        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
          <Calendar size={14} className="text-pulse-purple" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
          <Clock size={14} className="text-pulse-teal" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
          <MapPin size={14} className="text-pulse-pink" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3 mt-auto flex justify-between items-center bg-white">
        <div className="flex items-center gap-2 text-xs">
          <User size={14} />
          <span>Hosted by {event.college}</span>
        </div>
        
        {event.eventUrl && (
          <Button variant="outline" size="sm" className="text-xs z-10" asChild>
            <a 
              href={event.eventUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1"
              onClick={handleExternalLink}
            >
              Visit <ExternalLink size={12} />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
