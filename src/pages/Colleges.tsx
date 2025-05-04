
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Calendar, Link as LinkIcon, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEvents } from '@/contexts/EventContext';
import { Link } from 'react-router-dom';

const Colleges = () => {
  const { events } = useEvents();
  
  // Get colleges and their event counts
  const collegeData = React.useMemo(() => {
    const colleges: Record<string, {
      name: string;
      eventCount: number;
      types: Record<string, number>;
      upcomingEvents: number;
      location?: string;
      website?: string;
    }> = {};
    
    events.forEach(event => {
      if (!colleges[event.college]) {
        colleges[event.college] = {
          name: event.college,
          eventCount: 0,
          types: {},
          upcomingEvents: 0,
          location: event.location.split(',').pop()?.trim()
        };
      }
      
      // Increment event count for this college
      colleges[event.college].eventCount++;
      
      // Track event types
      if (!colleges[event.college].types[event.type]) {
        colleges[event.college].types[event.type] = 0;
      }
      colleges[event.college].types[event.type]++;
      
      // Count upcoming events
      const eventDate = new Date(event.date);
      if (eventDate >= new Date()) {
        colleges[event.college].upcomingEvents++;
      }
    });
    
    // Add website URLs based on college name
    Object.keys(colleges).forEach(name => {
      const websites: Record<string, string> = {
        'MIT': 'https://www.mit.edu',
        'Stanford University': 'https://www.stanford.edu',
        'Harvard University': 'https://www.harvard.edu',
        'UC Berkeley': 'https://www.berkeley.edu',
        'Carnegie Mellon': 'https://www.cmu.edu',
        'Georgia Tech': 'https://www.gatech.edu',
        'University of Michigan': 'https://www.umich.edu',
        'ETHGlobal': 'https://ethglobal.com',
        'Devfolio': 'https://devfolio.co',
        'DoraHacks': 'https://dorahacks.io',
      };
      
      colleges[name].website = websites[name] || '#';
    });
    
    return Object.values(colleges).sort((a, b) => b.eventCount - a.eventCount);
  }, [events]);

  const maxEvents = Math.max(...collegeData.map(college => college.eventCount));
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="min-h-screen container mx-auto px-4 py-12">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Colleges & Organizations</h1>
          <p className="text-lg text-muted-foreground">
            Explore the institutions and organizations hosting tech events on our platform
          </p>
        </header>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {collegeData.map((college) => (
            <Card key={college.name} className="overflow-hidden hover:shadow-lg transition-all glass">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{college.name}</h2>
                  <Badge variant="outline" className="capitalize">
                    {college.eventCount} Event{college.eventCount !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {college.location && (
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <MapPin size={16} />
                      <span>{college.location}</span>
                    </div>
                  )}
                  
                  {college.website && (
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <LinkIcon size={16} />
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pulse-purple hover:underline"
                      >
                        Official Website
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Calendar size={16} />
                    <span>{college.upcomingEvents} Upcoming Events</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Event Frequency</span>
                      <span className="font-medium">{((college.eventCount / maxEvents) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(college.eventCount / maxEvents) * 100} className="h-2" />
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Event Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(college.types).map(([type, count]) => (
                        <Badge key={type} variant="secondary" className="capitalize">
                          {type}: {count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/events?college=${encodeURIComponent(college.name)}`}
                    className="mt-4 text-sm text-pulse-purple hover:underline flex items-center"
                  >
                    View all events from {college.name} <ArrowRight size={12} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/70">
          © 2025 Pulse of Campus. All rights reserved.
        </div>
      </footer>
    </AnimatedBackground>
  );
};

export default Colleges;
