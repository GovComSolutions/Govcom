import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Globe, Handshake } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const partnerLogos = [
  { name: "Adobe", src: "/logos/ADOBELogo.png", alt: "Adobe Logo" },
  { name: "CareFirst", src: "/logos/CAREFIRSTLogo.png", alt: "CareFirst BlueCross BlueShield Logo" },
  { name: "Microsoft", src: "/logos/MsLogo.png", alt: "Microsoft Logo" },
  { name: "DMA", src: "/logos/DMALogo.png", alt: "Defense Media Activity Logo" },
  { name: "DOJ", src: "/logos/DOJLogo.png", alt: "Department of Justice Logo" },
  { name: "Scrum", src: "/logos/SCRUMLogo.svg", alt: "Scrum Logo" },
  { name: "USDA", src: "/logos/USDALogo.png", alt: "USDA Logo" },
  { name: "General Dynamics", src: "/logos/GDLogo.png", alt: "General Dynamics Logo" },
];

const featuredPartners = [
  {
    name: "Adobe",
    logo: "/logos/ADOBELogo.png",
    story: "Adobe has partnered with us to deliver secure, scalable digital solutions for government agencies, driving innovation and accessibility.",
    link: "#"
  },
  {
    name: "CareFirst",
    logo: "/logos/CAREFIRSTLogo.png",
    story: "Our collaboration with CareFirst has enabled advanced analytics and AI-driven insights to improve healthcare outcomes.",
    link: "#"
  },
  {
    name: "General Dynamics",
    logo: "/logos/GDLogo.png",
    story: "Together with General Dynamics, we've modernized mission-critical systems for federal clients, ensuring reliability and compliance.",
    link: "#"
  }
];

function PartnerLogosCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Duplicate logos for seamless looping
  const logos = [...partnerLogos, ...partnerLogos];
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let frame: number;
    let speed = 1.2; // px per frame
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
  const fadeColor = "var(--background)";
  return (
    <section className="py-16 bg-gray-800">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-serif">Our Partners</h2>
          <p className="text-gray-300 font-sans">
            We are proud to collaborate with industry leaders and innovators to deliver exceptional results for our clients.
          </p>
        </div>
        <div className="flex justify-center relative">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-20" style={{background: `linear-gradient(to right, ${fadeColor} 60%, transparent 100%)`}} />
          <div className="w-full max-w-6xl overflow-x-hidden" ref={scrollContainerRef} style={{whiteSpace: "nowrap"}}>
            <div className="flex items-center" style={{width: "max-content"}}>
              {logos.map((logo, idx) => (
                <div key={logo.name + idx} className="flex items-center justify-center h-40 basis-1/3 sm:basis-1/4 md:basis-1/6 px-8">
                  <img src={logo.src} alt={logo.alt} className="max-h-32 object-contain mx-auto grayscale hover:grayscale-0 transition" />
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

function FeaturedPartnersGrid() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container">
        <h3 className="text-2xl font-bold mb-8 font-serif text-center text-gray-900">Featured Partner Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPartners.map(partner => (
            <div key={partner.name} className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm animate-fade-in">
              <img src={partner.logo} alt={partner.name + ' Logo'} className="h-20 mb-4 object-contain" />
              <div className="font-bold text-lg mb-2 font-serif text-gray-900">{partner.name}</div>
              <div className="text-gray-700 mb-4 font-sans">{partner.story}</div>
              <a href={partner.link} className="text-primary hover:underline font-semibold font-sans">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPartnerWithUs() {
  const points = [
    { icon: <Handshake className="h-8 w-8 text-primary mb-2" />, title: "Shared Innovation", desc: "We co-create solutions with our partners to drive industry-leading results." },
    { icon: <CheckCircle className="h-8 w-8 text-primary mb-2" />, title: "Proven Results", desc: "Our partnerships have delivered measurable impact for clients across sectors." },
    { icon: <Users className="h-8 w-8 text-primary mb-2" />, title: "Long-term Collaboration", desc: "We build lasting relationships based on trust, transparency, and shared success." },
    { icon: <Globe className="h-8 w-8 text-primary mb-2" />, title: "Global Reach", desc: "Our network spans industries and geographies, enabling broad impact." },
  ];
  return (
    <section className="py-16 bg-gray-800">
      <div className="container">
        <h3 className="text-2xl font-bold mb-8 font-serif text-center text-white">Why Partner With Us?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, i) => (
            <div key={pt.title} className="flex flex-col items-center text-center p-6 bg-gray-700 border border-gray-600 rounded-xl shadow animate-fade-in text-white">
              {pt.icon}
              <div className="font-bold text-lg mb-2 font-serif text-white">{pt.title}</div>
              <div className="text-gray-200 font-sans">{pt.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BecomePartnerCTA() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2 font-serif text-gray-900">Interested in partnering with GovCom Solutions?</h3>
        <p className="text-gray-700 mb-6 font-sans">Contact us to explore partnership opportunities and join our network of industry leaders.</p>
        <Button asChild size="lg" className="font-sans bg-gray-800 hover:bg-gray-700 text-white rounded-full">
          <Link to="/contact">Become a Partner</Link>
        </Button>
      </div>
    </section>
  );
}

export default function Partners() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Our Partners"
        subtitle="Collaboration for innovation and impact"
        videoSrc="/46282-446732337.mp4"
      />
      {/* Partner Logos Carousel */}
      <PartnerLogosCarousel />
      {/* Featured Partner Stories */}
      <FeaturedPartnersGrid />
      {/* Why Partner With Us */}
      <WhyPartnerWithUs />
      {/* Become a Partner CTA */}
      <BecomePartnerCTA />
      <Footer />
    </div>
  );
} 