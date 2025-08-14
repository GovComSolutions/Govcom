
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Calculate parallax effect
  const backgroundY = scrollY * 0.5;
  const contentY = scrollY * 0.2;
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/vecteezy_time-lapse-of-the-united-states-capitol-building-washington_25251490.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Gray Overlay */}
      <div className="absolute inset-0 bg-gray-900/40" />
      {/* Content */}
      <div
        className="relative h-full flex flex-col justify-center items-center text-center px-4"
      >
        <div className="max-w-4xl animate-fade-in">
          <span className="inline-block text-white text-lg mb-4 tracking-wide border-b border-white/30 pb-2">
            GovCom Solutions
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            <span className="text-white">
              Reimagining Government and Enterprise
            </span>
            <br />
            <span className="text-white">
              with Trusted AI, Intelligent Automation, and Domain-Driven Agents
            </span>
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            From Readiness to Results — We Deliver Secure AI Consulting, Workflow Automation, Fine-Tuned Models, and Agentic Solutions Tailored for Public and Enterprise Transformation.
          </p>
        </div>
      </div>
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <a 
          href="#welcome" 
          className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm mb-2 font-medium text-white animate-bounce">{t.hero.scrollDown}</span>
          <ChevronDown className="h-8 w-8 animate-bounce text-white" />
        </a>
      </div>
      {/* Animated logo/hex mesh divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center overflow-hidden">
        <svg
          className="w-full h-16 animate-hex-wave"
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const x = 80 * i + 40;
            const y = i % 2 === 0 ? 32 : 48;
            const size = 68; // doubled logo size
            const showLogo = i % 4 === 0; // show logo sparsely
            return showLogo ? (
              <image
                key={i}
                className={`logo-divider hex-${i}`}
                href="/logos/main-logo.png"
                x={x - size / 2}
                y={y - size / 2}
                width={size}
                height={size}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <polygon
                key={i}
                className={`hex-divider hex-${i}`}
                points={`${x},${y-16} ${x+14},${y-8} ${x+14},${y+8} ${x},${y+16} ${x-14},${y+8} ${x-14},${y-8}`}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}
