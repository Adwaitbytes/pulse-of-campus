
import React from 'react';

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-background"></div>
        
        {/* Animated circles */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-pulse-purple/10 blur-[80px] animate-float"></div>
        <div className="absolute top-[40%] right-[15%] w-80 h-80 rounded-full bg-pulse-teal/10 blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-pulse-pink/10 blur-[90px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-60 h-60 rounded-full bg-pulse-orange/10 blur-[70px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
