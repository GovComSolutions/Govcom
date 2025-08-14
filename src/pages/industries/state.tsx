import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StateIndustry() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="State Industry"
        subtitle="Tailored IT solutions for state agencies"
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
        <p className="mb-6 text-lg">State agencies face unique challenges in delivering efficient, compliant, and citizen-focused services. At GovCom Solutions, we provide tailored IT solutions that modernize legacy systems, streamline operations, and ensure regulatory compliance for state governments.</p>
        <p className="mb-6 text-lg">Our expertise spans digital transformation, secure cloud adoption, and data-driven decision-making. We help agencies leverage technology to improve service delivery, enhance transparency, and respond rapidly to changing public needs.</p>
        <p className="mb-6 text-lg">With a deep understanding of state regulations and a commitment to innovation, GovCom Solutions empowers state agencies to achieve their mission and deliver better outcomes for citizens.</p>
      </main>
      <Footer />
    </div>
  );
} 