
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center glass p-10 rounded-xl max-w-md">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pulse-purple to-pulse-teal text-transparent bg-clip-text">404</h1>
          <p className="text-xl mb-6">Oops! We couldn't find that page</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-gradient-to-r from-pulse-purple to-pulse-teal">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    </AnimatedBackground>
  );
};

export default NotFound;
