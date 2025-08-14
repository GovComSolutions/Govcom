import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FinancialIndustry() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <PageHeader
        title="Financial Services"
        subtitle="Digital solutions for a secure financial future"
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
        <p className="mb-6 text-lg">Financial institutions operate in a fast-paced, highly regulated environment where security and efficiency are paramount. GovCom Solutions provides advanced digital solutions that help financial organizations strengthen security, streamline operations, and enhance decision-making.</p>
        <p className="mb-6 text-lg">Our offerings include secure cloud infrastructure, data analytics, compliance automation, and customer experience platforms tailored to the needs of banks, credit unions, and other financial entities.</p>
        <p className="mb-6 text-lg">By leveraging the latest technology and industry best practices, we empower financial institutions to adapt to change, mitigate risk, and achieve sustainable growth.</p>
      </main>
      <Footer />
    </div>
  );
} 