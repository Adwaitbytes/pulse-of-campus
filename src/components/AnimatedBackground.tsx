
import React from 'react';

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-indigo-950 dark:to-black"></div>
        
        {/* Animated particles */}
        <div className="particles-container absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full glow"
              style={{
                width: `${Math.random() * 10 + 5}rem`,
                height: `${Math.random() * 10 + 5}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${
                  Math.random() * 100 + 100
                }, ${
                  Math.random() * 100 + 100
                }, ${
                  Math.random() * 255
                }, 0.2) 0%, rgba(255,255,255,0) 70%)`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                transform: `scale(${Math.random() * 1 + 0.5})`,
                zIndex: -5,
              }}
            />
          ))}
        </div>
        
        {/* Main animated orbs */}
        <div className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[40%] right-[15%] w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-[150px] float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[100px] float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-72 h-72 rounded-full bg-amber-500/10 blur-[90px] float" style={{ animationDelay: '4.5s' }}></div>
        
        {/* Mesh grid */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjAuNSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')]"></div>
        
        {/* Glass panels */}
        <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-white/5 rounded-full backdrop-blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-[50rem] h-[50rem] bg-white/5 rounded-full backdrop-blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
