import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function CaseStudyFinancialRPA() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="RPA Transformation"
        subtitle="Financial Services Efficiency"
        imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
      />
      <main className="max-w-3xl mx-auto py-12 pb-16 px-4 text-primary-900 dark:text-primary-100">
        <p className="mb-6 text-lg">A financial services firm engaged GovCom Solutions to implement robotic process automation (RPA) across key business functions. The initiative targeted manual, repetitive tasks to improve accuracy, speed, and compliance.</p>
        <p className="mb-6 text-lg">Our team deployed RPA bots to handle data entry, reporting, and regulatory checks, freeing staff to focus on higher-value work. The transformation resulted in significant cost savings and enhanced operational resilience.</p>
        <p className="mb-6 text-lg">This case study illustrates GovCom Solutions' ability to deliver automation solutions that drive measurable results in the financial sector.</p>
      </main>
      <Footer />
    </div>
  );
} 