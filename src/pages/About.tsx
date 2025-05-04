
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { ArrowRight, Calendar, Globe, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="min-h-screen container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="glass p-8 rounded-xl">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pulse-purple to-pulse-teal text-transparent bg-clip-text">About Pulse of Campus</h1>
            <p className="text-lg mb-6 text-foreground/80">
              Pulse of Campus is the premier platform connecting students with the most exciting tech events, 
              hackathons, workshops, and talks happening across college campuses worldwide.
            </p>
            
            <p className="text-foreground/80 mb-6">
              Our mission is to democratize access to valuable learning and networking opportunities by
              aggregating events from major platforms including DoraHacks, Devfolio, and university campuses.
              We believe that every student should have equal opportunity to participate in the tech ecosystem
              regardless of their location or institution.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pulse-purple to-pulse-teal p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
                  <p className="text-foreground/70">
                    Find the most relevant tech events tailored to your interests and location
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pulse-purple to-pulse-teal p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-foreground/70">
                    Our platform grows with contributions from students and organizations across the globe
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pulse-purple to-pulse-teal p-3 rounded-full">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p className="text-foreground/70">
                    Connect with events from top universities and tech platforms worldwide
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pulse-purple to-pulse-teal p-3 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Opportunity Access</h3>
                  <p className="text-foreground/70">
                    Level the playing field by discovering opportunities you might otherwise miss
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          
          <div className="glass p-8 rounded-xl">
            <p className="mb-4 text-foreground/80">
              Pulse of Campus started in 2025 when a group of computer science students realized how difficult 
              it was to keep track of all the amazing tech events happening across different colleges and platforms.
            </p>
            
            <p className="mb-4 text-foreground/80">
              Too often, students would miss amazing opportunities simply because they weren't aware of them or 
              discovered them too late. We created this platform to solve that problem - making sure no student 
              misses out on career-changing hackathons, insightful tech talks, or valuable workshops.
            </p>
            
            <p className="text-foreground/80">
              Today, we aggregate events from major platforms like DoraHacks and Devfolio, as well as directly 
              from college campuses, creating a central hub for all tech-related educational events.
            </p>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Join In?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Start exploring events or submit your own to share with the community
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-pulse-purple to-pulse-teal hover:opacity-95">
              <Link to="/events">
                Browse Events <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <Link to="/submit-event">
                Submit Event
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/70">
          © 2025 Pulse of Campus. All rights reserved.
        </div>
      </footer>
    </AnimatedBackground>
  );
};

export default About;
