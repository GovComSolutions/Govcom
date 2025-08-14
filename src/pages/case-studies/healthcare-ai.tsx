import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function CaseStudyHealthcareAI() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="AI-Driven Insights"
        subtitle="Healthcare Innovation"
        imageSrc="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
      />
      <main className="max-w-3xl mx-auto py-12 pb-16 px-4 text-primary-900 dark:text-primary-100">
        <p className="mb-6 text-lg">A leading healthcare provider collaborated with GovCom Solutions to harness the power of artificial intelligence for improved patient care. Our team developed custom AI models to analyze patient data, predict health risks, and recommend personalized treatment plans.</p>
        <p className="mb-6 text-lg">The solution enabled clinicians to make data-driven decisions, reduce administrative burden, and enhance patient outcomes. By integrating AI into existing workflows, the provider achieved greater efficiency and innovation in healthcare delivery.</p>
        <p className="mb-6 text-lg">This case study demonstrates GovCom Solutions' ability to deliver advanced analytics and AI solutions that drive measurable impact in the healthcare sector.</p>
      </main>
      <Footer />
    </div>
  );
} 