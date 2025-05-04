
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import EventForm from '@/components/EventForm';
import { useEvents } from '@/contexts/EventContext';

const SubmitEvent = () => {
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addEvent({
        ...data,
        image: '' // No image upload in this version
      });
      
      setIsSubmitting(false);
      navigate('/events');
    }, 1500);
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
