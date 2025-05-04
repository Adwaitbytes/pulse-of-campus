
import React, { createContext, useState, useContext, useEffect } from 'react';
import { EventType } from '@/components/EventCard';
import { mockEvents } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

type EventContextType = {
  events: EventType[];
  filteredEvents: EventType[];
  addEvent: (event: Omit<EventType, 'id'>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedCollege: string;
  setSelectedCollege: (college: string) => void;
  loading: boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const location = useLocation();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCollege, setSelectedCollege] = useState('All Colleges');
  
  // Initialize with mock data
  useEffect(() => {
    // Simulate an API request
    setTimeout(() => {
      // Get events from local storage or use mock data
      const storedEvents = localStorage.getItem('pulseOfCampusEvents');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents(mockEvents);
      }
      setLoading(false);
    }, 800);
  }, []);
  
  // Save events to local storage when they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('pulseOfCampusEvents', JSON.stringify(events));
    }
  }, [events]);
  
  // Apply URL params for filtering if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const collegeParam = params.get('college');
    
    if (collegeParam) {
      setSelectedCollege(collegeParam);
    }
  }, [location.search]);
  
  // Add new event
  const addEvent = (event: Omit<EventType, 'id'>) => {
    const newEvent: EventType = {
      ...event,
      id: `${Date.now()}`, // Generate a simple ID
    };
    
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    
    toast({
      title: "Event submitted successfully!",
      description: "Your event has been added to our platform.",
    });
  };
  
  // Filter events based on the selected filters
  const filteredEvents = events.filter(event => {
    // Filter by search term
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by date
    if (selectedDate) {
      const eventDate = new Date(event.date);
      const filterDate = new Date(selectedDate);
      
      if (
        eventDate.getDate() !== filterDate.getDate() || 
        eventDate.getMonth() !== filterDate.getMonth() || 
        eventDate.getFullYear() !== filterDate.getFullYear()
      ) {
        return false;
      }
    }
    
    // Filter by event type
    if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
      return false;
    }
    
    // Filter by college
    if (selectedCollege !== 'All Colleges' && event.college !== selectedCollege) {
      return false;
    }
    
    return true;
  });
  
  const value = {
    events,
    filteredEvents,
    addEvent,
    searchTerm,
    setSearchTerm,
    selectedDate,
    setSelectedDate,
    selectedTypes,
    setSelectedTypes,
    selectedCollege,
    setSelectedCollege,
    loading
  };
  
  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
