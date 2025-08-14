import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FederalIndustry() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="Federal Sector"
        subtitle="Secure, scalable IT for mission-critical success"
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
        <p className="mb-6 text-lg">Federal agencies require robust, secure, and scalable IT solutions to fulfill their missions and serve the public effectively. GovCom Solutions partners with federal organizations to deliver technology that drives efficiency, innovation, and compliance.</p>
        <p className="mb-6 text-lg">Our services include cloud migration, cybersecurity, data management, and digital modernization tailored to the unique needs of federal clients. We ensure that systems are resilient, compliant with federal standards, and ready to support evolving mission requirements.</p>
        <p className="mb-6 text-lg">With a proven track record in the federal sector, GovCom Solutions is committed to helping agencies achieve operational excellence and mission-critical success.</p>
      </main>
      <Footer />
    </div>
  );
} 