import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";

const industries = [
  {
    title: "State Industry",
    description: "Tailored IT solutions that enhance efficiency, compliance, and citizen services for state agencies.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "/industries/state",
  },
  {
    title: "Healthcare & Lifesciences",
    description: "Innovative technology solutions that optimize healthcare operations, enhance patient care, and support regulatory compliance.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80", // New healthcare image
    link: "/industries/healthcare",
  },
  {
    title: "Federal Sector",
    description: "Secure, scalable IT services that drive efficiency, innovation, and mission-critical success for federal agencies.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    link: "/industries/federal",
  },
  {
    title: "Financial Services",
    description: "Advanced digital solutions that strengthen security, streamline operations, and enhance decision-making in financial institutions.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "/industries/financial",
  },
];

export default function Industries() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Industries We Serve"
        subtitle="Driving efficiency, compliance, and growth across diverse sectors"
        videoSrc="/212001_small.mp4"
      />

      {/* Industries Grid */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="bg-gray-700 border border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col md:flex-row"
            >
              <img
                src={industry.image}
                alt={industry.title}
                className="w-full md:w-1/3 h-48 object-cover md:h-auto"
              />
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2 text-white">{industry.title}</h3>
                <p className="text-gray-200 mb-4">{industry.description}</p>
                <Link to={industry.link} className="w-max">
                  <Button variant="outline" className="w-max border-primary text-primary hover:bg-primary hover:text-white">Learn More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Get in Touch</h2>
          <p className="mb-6 text-gray-700 text-lg">Do you have further questions about our services? Feel free to connect with us.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
            <div className="text-left">
              <div className="font-semibold text-gray-900">Phone:</div>
              <div className="mb-2 text-gray-700">410-695-6181</div>
              <div className="font-semibold text-gray-900">Email:</div>
              <div className="mb-2 text-gray-700">info@govcomsolutions.com</div>
              <div className="font-semibold text-gray-900">Address:</div>
              <div className="text-gray-700">10010 Calla Ct.<br />Laurel, Maryland 20723</div>
              <a href="https://maps.google.com/?q=10010+Calla+Ct,+Laurel,+Maryland+20723" target="_blank" rel="noopener noreferrer" className="text-primary underline mt-2 inline-block">View Map & Directions</a>
            </div>
          </div>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white">Contact Us</Button>
        </div>
      </section>
      <Footer />
    </div>
  );
} 