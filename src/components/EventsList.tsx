
import React, { useEffect } from 'react';
import EventCard, { EventType } from './EventCard';

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
          <div key={i} className="bg-card animate-pulse rounded-lg h-[350px]"></div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
};

export default EventsList;
