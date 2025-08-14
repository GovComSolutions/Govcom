import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface ServiceProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  complexity: number;
  features: string[];
  impact?: number;
  popularity?: number;
}

export default function ServiceCard({ service, contactLink }: { service: ServiceProps, contactLink?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl bg-card group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={service.image} 
          alt={service.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">{service.name}</h3>
            <div className="flex items-center text-white/80 text-sm mb-2">
              <span>{service.category}</span>
              <span className="mx-2">•</span>
              <span>Complexity: {service.complexity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <p className="text-muted-foreground line-clamp-2 mb-2">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.slice(0, 3).map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
            >
              <span>{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              +{service.features.length - 3} more
            </div>
          )}
        </div>
        <div className="flex justify-end mt-auto">
          <Button asChild className="btn-primary px-5 py-2 text-base font-semibold">
            <Link to="/contact">Set Up Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 