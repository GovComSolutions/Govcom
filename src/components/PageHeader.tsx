import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  videoSrc?: string;
  imageSrc?: string;
}

export default function PageHeader({ title, subtitle, description, videoSrc, imageSrc }: PageHeaderProps) {
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
      ) : null}
      
      {/* Gray gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-background/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg font-serif">
          {title}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 font-medium drop-shadow font-sans">
          {subtitle}
        </h2>
        {description && (
          <p className="text-lg text-gray-200 mb-8 drop-shadow max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
} 