import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);
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

  // Handle card click to navigate to event details
  const handleCardClick = () => {
    // If there's an external URL, open it directly instead of going to details page
    if (event.eventUrl) {
      window.open(event.eventUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/event/${event.id}`);
    }
  };

  // External link handler (if we want to keep a separate button)
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Prevent card click handler
  };

  const imageToUse = imageError || !event.image ? getPlaceholderImage() : event.image;

  // Determine if the event is upcoming
  const isUpcoming = new Date(event.date) > new Date();

  // Calculate days remaining for upcoming events
  const daysRemaining = isUpcoming 
    ? Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card 
      className="event-card overflow-hidden h-full border-0 shadow-xl bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl group relative cursor-pointer"
      style={{ '--index': index } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-3xl"
      ></div>

      <div className="relative h-56 overflow-hidden rounded-t-3xl bg-gray-900">
        <div className={`absolute top-3 left-3 z-10`}>
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
        
        <motion.div
          className="w-full h-full"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={imageToUse}
            alt={event.title} 
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-700" 
            loading="eager"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Add prominent event URL button on top of the image */}
        {event.eventUrl && (
          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
            <a 
              href={event.eventUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                window.open(event.eventUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <span>Visit Event</span> <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-5">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-indigo-600 transition-colors">
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
        
        {event.eventUrl && (
          <Button className="btn-modern" size="sm" asChild onClick={e => e.stopPropagation()}>
            <a 
              href={event.eventUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1"
              onClick={handleExternalLink}
            >
              <span>Visit</span> <ExternalLink size={12} />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
