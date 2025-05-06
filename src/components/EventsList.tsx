
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/40 shadow-xl h-[350px] sm:h-[400px]">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 sm:p-5">
              <Skeleton className="h-6 sm:h-7 w-3/4 mb-2 sm:mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-3 sm:mb-4" />
              <div className="flex gap-2 mt-3 sm:mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">No events found</h3>
        <p className="text-muted-foreground text-base sm:text-lg">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 relative z-20">
      {events.map((event, index) => (
        <div key={event.id} className="card-container">
          <EventCard event={event} index={index} />
        </div>
      ))}
    </div>
  );
};

export default EventsList;
