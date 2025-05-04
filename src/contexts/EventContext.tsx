
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
  
  // Initialize with mock data with a reliable approach
  useEffect(() => {
    const loadEvents = () => {
      try {
        console.log("Loading events...");
        setLoading(true);
        
        // Get events from local storage or use mock data
        const storedEvents = localStorage.getItem('pulseOfCampusEvents');
        if (storedEvents) {
          try {
            const parsedEvents = JSON.parse(storedEvents);
            // Validate that the parsed data matches our expected format
            if (Array.isArray(parsedEvents) && parsedEvents.length > 0 && parsedEvents[0].title) {
              console.log("Using stored events:", parsedEvents.length);
              setEvents(parsedEvents);
            } else {
              console.log("Invalid stored events format, using mock data");
              setEvents(mockEvents);
              localStorage.setItem('pulseOfCampusEvents', JSON.stringify(mockEvents));
            }
          } catch (e) {
            console.error("Error parsing stored events:", e);
            setEvents(mockEvents);
            localStorage.setItem('pulseOfCampusEvents', JSON.stringify(mockEvents));
          }
        } else {
          console.log("No stored events, using mock data");
          setEvents(mockEvents);
          localStorage.setItem('pulseOfCampusEvents', JSON.stringify(mockEvents));
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents(mockEvents); // Fallback to mock data
      } finally {
        setLoading(false); 
      }
    };
    
    // Delay loading slightly to ensure components are mounted
    setTimeout(loadEvents, 100);
  }, []);
  
  // Save events to local storage when they change (but skip during initial loading)
  useEffect(() => {
    if (!loading && events.length > 0) {
      localStorage.setItem('pulseOfCampusEvents', JSON.stringify(events));
    }
  }, [events, loading]);
  
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
  
  console.log("EventContext filtered events:", filteredEvents.length);
  
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
