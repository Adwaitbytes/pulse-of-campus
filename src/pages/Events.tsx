
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import EventsList from '@/components/EventsList';
import EventFilters from '@/components/EventFilters';
import { useEvents } from '@/contexts/EventContext';

const Events = () => {
  const { 
    filteredEvents, 
    searchTerm, 
    setSearchTerm, 
    selectedDate, 
    setSelectedDate, 
    selectedTypes, 
    setSelectedTypes, 
    selectedCollege, 
    setSelectedCollege,
    loading
  } = useEvents();

  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="min-h-screen container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campus Events</h1>
          <p className="text-muted-foreground">
            Discover and filter through upcoming events from colleges across the country
          </p>
        </header>

        <div className="mb-8">
          <EventFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedCollege={selectedCollege}
            setSelectedCollege={setSelectedCollege}
          />
        </div>
        
        <div className="my-4">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading events...' : `Showing ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        <EventsList events={filteredEvents} loading={loading} />
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/70">
          © 2025 Pulse of Campus. All rights reserved.
        </div>
      </footer>
    </AnimatedBackground>
  );
};

export default Events;
