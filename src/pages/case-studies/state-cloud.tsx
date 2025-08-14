import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function CaseStudyStateCloud() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="Cloud Migration"
        subtitle="State Government Agility"
        imageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      />
      <main className="max-w-3xl mx-auto py-12 pb-16 px-4 text-primary-900 dark:text-primary-100">
        <p className="mb-6 text-lg">GovCom Solutions partnered with a state government to migrate critical applications and data to the cloud. The project aimed to improve scalability, reduce costs, and enhance disaster recovery capabilities.</p>
        <p className="mb-6 text-lg">Our experts designed a tailored migration strategy, provided hands-on support, and ensured minimal disruption to government services. The result was a more flexible, resilient, and future-ready IT environment for the state.</p>
        <p className="mb-6 text-lg">This case study showcases GovCom Solutions' experience in cloud transformation and public sector IT modernization.</p>
      </main>
      <Footer />
    </div>
  );
} 