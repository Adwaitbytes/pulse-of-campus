
import React, { useEffect } from 'react';
import EventCard, { EventType } from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';

interface EventsListProps {
  events: EventType[];
  loading: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ events, loading }) => {
  useEffect(() => {
    console.log("EventsList rendered with events:", events.length);
  }, [events]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg overflow-hidden border shadow-md">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-lg border-2 border-dashed">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
      {events.map((event, index) => (
        <div key={event.id} className="transform transition-all duration-300 hover:-translate-y-1 z-10">
          <EventCard event={event} index={index} />
        </div>
      ))}
    </div>
  );
};

export default EventsList;
