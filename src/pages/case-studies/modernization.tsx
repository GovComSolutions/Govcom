import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function CaseStudyModernization() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="Digital Modernization"
        subtitle="Federal Agency Transformation"
        imageSrc="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
      />
      <main className="max-w-3xl mx-auto py-12 pb-16 px-4 text-primary-900 dark:text-primary-100">
        <p className="mb-6 text-lg">A major federal agency partnered with GovCom Solutions to modernize its legacy IT infrastructure. The project focused on migrating critical systems to the cloud, implementing robust cybersecurity measures, and streamlining workflows for greater efficiency.</p>
        <p className="mb-6 text-lg">Our team worked closely with agency stakeholders to ensure a seamless transition, minimize downtime, and maintain compliance with federal standards. The result was a more agile, secure, and cost-effective technology environment that empowered the agency to better serve the public.</p>
        <p className="mb-6 text-lg">This case study highlights GovCom Solutions' expertise in digital transformation, risk management, and mission-critical IT delivery for government clients.</p>
      </main>
      <Footer />
    </div>
  );
} 