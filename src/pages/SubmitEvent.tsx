
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import EventForm from '@/components/EventForm';
import { useEvents } from '@/contexts/EventContext';
import { useToast } from '@/hooks/use-toast';

const SubmitEvent = () => {
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Add image based on event type
    const eventTypeImages: Record<string, string> = {
      'hackathon': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=500&auto=format&fit=crop',
      'tech-talk': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop',
      'workshop': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop',
      'social': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop',
      'other': 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=500&auto=format&fit=crop'
    };
    
    // Format the date to ensure consistency
    const formattedDate = new Date(data.date).toISOString().split('T')[0];
    
    // Add the event with proper data
    setTimeout(() => {
      addEvent({
        ...data,
        date: formattedDate,
        image: eventTypeImages[data.type] || ''
      });
      
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "Your event has been submitted successfully",
      });
      
      navigate('/events');
    }, 1000);
  };
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit a New Event</h1>
            <p className="text-muted-foreground">
              Share your college event with the community
            </p>
          </header>
          
          <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
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

export default SubmitEvent;
