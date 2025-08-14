import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const clientLogos = [
  {
    name: "Adobe",
    src: "/logos/ADOBELogo.png",
    alt: "Adobe Logo"
  },
  {
    name: "CareFirst",
    src: "/logos/CAREFIRSTLogo.png",
    alt: "CareFirst BlueCross BlueShield Logo"
  },
  {
    name: "Microsoft",
    src: "/logos/MsLogo.png",
    alt: "Microsoft Logo"
  },
  {
    name: "DMA",
    src: "/logos/DMALogo.png",
    alt: "Defense Media Activity Logo"
  },
  {
    name: "DOJ",
    src: "/logos/DOJLogo.png",
    alt: "Department of Justice Logo"
  },
  {
    name: "Scrum",
    src: "/logos/SCRUMLogo.svg",
    alt: "Scrum Logo"
  },
  {
    name: "USDA",
    src: "/logos/USDALogo.png",
    alt: "USDA Logo"
  },
  {
    name: "General Dynamics",
    src: "/logos/GDLogo.png",
    alt: "General Dynamics Logo"
  }
];

import { useEffect, useRef } from "react";

export default function ClientLogosCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless looping
  const logos = [...clientLogos, ...clientLogos];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let frame: number;
    let speed = 1; // px per frame
    function animate() {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Get fade color from CSS variable for theme support
  const fadeColor = "var(--background)";

  return (
    <section className="section bg-muted py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Clients</h2>
          <p className="text-muted-foreground">
            We've had the pleasure of collaborating with an array of awesome clients, showcasing our diverse portfolio of successful partnerships.
          </p>
        </div>
        <div className="flex justify-center relative">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-20" style={{background: `linear-gradient(to right, ${fadeColor} 60%, transparent 100%)`}} />
          <div className="w-full max-w-6xl overflow-x-hidden" ref={scrollContainerRef} style={{whiteSpace: "nowrap"}}>
            <div className="flex items-center" style={{width: "max-content"}}>
              {logos.map((logo, idx) => (
                <div key={logo.name + idx} className="flex items-center justify-center h-40 basis-1/4 md:basis-1/6 px-8">
                  <img src={logo.src} alt={logo.alt} className="max-h-32 object-contain mx-auto" />
                </div>
              ))}
            </div>
          </div>
          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-20" style={{background: `linear-gradient(to left, ${fadeColor} 60%, transparent 100%)`}} />
        </div>
      </div>
    </section>
  );
}
