
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  // Convert date string to Date object
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <Link to={`/event/${event.id}`}>
      <Card 
        className="event-card overflow-hidden h-full animate-in"
        style={{ '--index': index } as React.CSSProperties}
      >
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute top-3 right-3 z-10`}>
            <Badge className={`${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>
          <img 
            src={event.image || `/placeholder.svg`}
            alt={event.title} 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-1/2"></div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
          
          <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
            <MapPin size={14} />
            <span className="truncate">{event.location}</span>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-3 mt-auto">
          <div className="flex items-center gap-2 text-xs">
            <User size={14} />
            <span>Hosted by {event.college}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
