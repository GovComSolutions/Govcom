import React, { useEffect, useState } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  videoSrc?: string;
  imageSrc?: string;
}

export default function PageHeader({ title, subtitle, description, videoSrc, imageSrc }: PageHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[65vh] md:h-[75vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        /* Animated background when no video/image */
        <div className="absolute inset-0 z-0">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 animate-gradient-x"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-400/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-purple-400/30 rotate-45 animate-float-medium"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 border border-indigo-400/30 animate-float-fast"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-blue-400/20 rounded-full animate-float-slow"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:20px_20px] animate-slide-x"></div>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:20px_20px] animate-slide-y"></div>
          </div>
        </div>
      )}
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-background/80 z-10" />
      
      {/* Content with animations */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full">
        <h1 
          className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg font-serif transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {title}
        </h1>
        <h2 
          className={`text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 font-medium drop-shadow font-sans transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {subtitle}
        </h2>
        {description && (
          <p 
            className={`text-lg text-gray-200 mb-8 drop-shadow max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {description}
          </p>
        )}
        
        {/* Animated underline */}
        <div 
          className={`w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 delay-700 ${
            isVisible ? 'w-32' : 'w-0'
          }`}
        ></div>
      </div>
    </section>
  );
} 