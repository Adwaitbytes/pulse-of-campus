
import React, { useEffect } from 'react';
import EventCard, { EventType } from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/40 shadow-xl h-[400px]">
            <Skeleton className="h-48 w-full" />
            <div className="p-5">
              <Skeleton className="h-7 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2 mt-4">
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
      <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-3xl border-2 border-white/40">
        <h3 className="text-2xl font-semibold mb-4">No events found</h3>
        <p className="text-muted-foreground text-lg">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {events.map((event, index) => (
        <motion.div 
          key={event.id} 
          className="card-tilt shine"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.43, 0.13, 0.23, 0.96] 
          }}
        >
          <EventCard event={event} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EventsList;
