import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HealthcareIndustry() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="Healthcare & Lifesciences"
        subtitle="Innovative technology for better patient care"
        videoSrc="/212001_small.mp4"
      />
      <main className="max-w-3xl mx-auto py-12 pb-16 px-4 text-blue-900 dark:text-blue-100">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/industries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Industries
            </Link>
          </Button>
        </div>
        <p className="mb-6 text-lg">Healthcare organizations are under constant pressure to improve patient outcomes, reduce costs, and maintain regulatory compliance. GovCom Solutions delivers advanced IT solutions that optimize healthcare operations and support the delivery of high-quality care.</p>
        <p className="mb-6 text-lg">From secure electronic health records to telemedicine platforms and data analytics, our technology empowers providers to make informed decisions, streamline workflows, and enhance patient engagement.</p>
        <p className="mb-6 text-lg">With a focus on security, interoperability, and innovation, we help healthcare and life sciences organizations navigate the complexities of modern healthcare and achieve sustainable success.</p>
      </main>
      <Footer />
    </div>
  );
} 