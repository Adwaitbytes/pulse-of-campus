
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Search, Star, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 md:pr-12 space-y-8 mb-16 md:mb-0 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Sparkles size={16} className="text-indigo-600" />
                <span>Discover Amazing Hackathons & Events</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Connect With The
                </span> 
                <br />
                <span className="relative">
                  <span>Global Tech Community</span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <path
                      d="M3 9C50 5 100 2 150 9C200 16 250 9 297 5"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6E42CC" />
                        <stop offset="100%" stopColor="#0AEFFF" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-xl text-foreground/80 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Your all-in-one platform to find and share tech talks, hackathons, and workshops
              from colleges across the globe. Never miss an opportunity to innovate, learn, and grow.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button asChild className="btn-modern px-6 py-6 text-base font-medium">
                <Link to="/events" className="flex items-center gap-2">
                  <Search size={18} />
                  <span>Explore Events</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="px-6 py-6 text-base font-medium border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300">
                <Link to="/submit-event" className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Submit Event</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="pt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${num + 20}.jpg`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-600 font-bold">
                  +
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm text-foreground/60">
                  Trusted by <span className="font-semibold">5,000+</span> event organizers
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3]">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-3xl transform -rotate-3"></div>
              
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden border-2 border-white/60 shadow-2xl">
                <img 
                  src="public/lovable-uploads/c57f8990-7c8b-4686-b307-77c34a79b9a3.png" 
                  alt="College Events" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="glass-dark p-6 rounded-xl text-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl mb-1">Featured Events</h3>
                      <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                        <TrendingUp size={12} />
                        <span>Popular</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 bg-indigo-600/60 rounded-full">Hackathons</span>
                      <span className="text-xs px-2 py-1 bg-cyan-600/60 rounded-full">Tech Talks</span>
                      <span className="text-xs px-2 py-1 bg-pink-600/60 rounded-full">Workshops</span>
                    </div>
                    <div className="text-sm text-white/80">
                      Join the community of innovators and creators!
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                className="absolute -top-6 right-24 glass px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <TrendingUp size={14} />
                </div>
                <span>150+ Colleges</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 left-16 glass px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <Calendar size={14} />
                </div>
                <span>3,000+ Events</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
