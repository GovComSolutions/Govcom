import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard, { ServiceProps } from "../components/ServiceCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import SectionHeader from "@/components/SectionHeader";
import PageHeader from "@/components/PageHeader";

// Sample services data
const allServices: ServiceProps[] = [
  // 1
  {
    id: "ai-ml",
    name: "🧠 AI & Machine Learning",
    description: "Deploy secure, domain-aligned AI/ML models to power intelligent automation, predictive insights, and mission-critical decisions.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    category: "AI & Automation",
    complexity: 5,
    impact: 5,
    popularity: 5,
    features: ["AI Models", "Chatbots", "Predictive Analytics", "Data Extraction"],
  },
  // 2
  {
    id: "rpa",
    name: "⚙️ Robotic Process Automation (RPA)",
    description: "Automate high-volume, repetitive tasks with bot-driven workflows tailored to public sector operations.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    category: "Automation",
    complexity: 3,
    impact: 4,
    popularity: 4,
    features: ["Bot Development", "Process Mapping", "Audit Trails", "Compliance Integration"],
  },
  // 3
  {
    id: "pega-services",
    name: "🔄 Pega Workflow Automation",
    description: "Design and optimize Pega-based solutions for streamlined case management and digital transformation.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    category: "Automation",
    complexity: 3,
    impact: 4,
    popularity: 4,
    features: ["Pega Workflow", "Case Management", "Automation", "Platform Optimization"],
  },
  // 4
  {
    id: "process-discovery",
    name: "🔍 Consulting & Process Discovery",
    description: "Identify gaps, bottlenecks, and innovation opportunities through strategic process analysis.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    category: "Consulting",
    complexity: 3,
    impact: 4,
    popularity: 4,
    features: ["Process Mapping", "Opportunity Analysis", "Innovation Consulting", "Change Enablement"],
  },
  // 5
  {
    id: "org-effectiveness",
    name: "🧩 Organizational Effectiveness",
    description: "Enhance performance and efficiency through targeted assessments and change strategies.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    category: "Consulting",
    complexity: 3,
    impact: 4,
    popularity: 4,
    features: ["Performance Analysis", "Change Management", "Process Optimization", "Strategy Alignment"],
  },
  // 6
  {
    id: "digital-solutions",
    name: "📱 Digital Solutions",
    description: "Modernize service delivery with digital platforms designed for scale, usability, and engagement.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    complexity: 4,
    impact: 5,
    popularity: 5,
    features: ["Web Portals", "Cloud Integration", "Mobile Platforms", "Scalable Infrastructure"],
  },
  // 7
  {
    id: "mobile-app-dev",
    name: "📱 Mobile App Development",
    description: "Develop secure, user-friendly apps for iOS and Android — tailored to government and citizen needs.",
    image: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    complexity: 4,
    impact: 5,
    popularity: 4,
    features: ["iOS & Android", "Cybersecurity", "Native UX/UI", "Compliance-Ready"],
  },
  // 8
  {
    id: "ui-ux-design",
    name: "🖥 UI/UX Design",
    description: "Create accessible, human-centered interfaces optimized for inclusivity and performance.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    category: "Design & Experience",
    complexity: 2,
    impact: 4,
    popularity: 4,
    features: ["Section 508", "WCAG 2.1", "User Testing", "Accessibility Audits"],
  },
  // 9
  {
    id: "cx-ex-strategy",
    name: "🌐 CX/EX Strategy",
    description: "Map and elevate digital journeys for both citizens and employees with inclusive design strategy.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    category: "Design & Experience",
    complexity: 2,
    impact: 4,
    popularity: 4,
    features: ["Journey Mapping", "Accessibility", "Feedback Systems", "Digital Service Optimization"],
  },
  // 10
  {
    id: "exec-leadership-coaching",
    name: "👥 Executive Coaching & Leadership Development",
    description: "Equip leaders to drive transformation through focused coaching and succession strategy.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    category: "Coaching",
    complexity: 2,
    impact: 5,
    popularity: 4,
    features: ["1:1 Executive Coaching", "Leadership Workshops", "Talent Strategy", "Succession Planning"],
  },
  // 11
  {
    id: "project-management",
    name: "📊 Project & Program Management",
    description: "Ensure successful delivery of complex initiatives with structured project governance and delivery frameworks.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    category: "Management",
    complexity: 3,
    impact: 5,
    popularity: 5,
    features: ["PMO Operations", "Risk Management", "Stakeholder Engagement", "Agile/Scrum Practices"],
  },
  // 12
  {
    id: "state-program-staffing",
    name: "🧑‍💼 State Program Staffing",
    description: "Provide expert staffing and oversight for public sector programs with proven delivery models.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
    category: "Management",
    complexity: 3,
    impact: 4,
    popularity: 3,
    features: ["SME Staffing", "Coaching & Oversight", "PMO Support", "Timeline & Budget Management"],
  },
];

export default function AIServices() {
  const [filteredServices, setFilteredServices] = useState<ServiceProps[]>(allServices);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [complexityRange, setComplexityRange] = useState<number[]>([1, 5]);
  const [impactRange, setImpactRange] = useState<number[]>([1, 5]);
  const [popularityRange, setPopularityRange] = useState<number[]>([1, 5]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = allServices;
    if (categoryFilter !== "all") {
      result = result.filter(service => service.category === categoryFilter);
    }
    result = result.filter(service =>
      service.complexity >= complexityRange[0] && service.complexity <= complexityRange[1] &&
      service.impact >= impactRange[0] && service.impact <= impactRange[1] &&
      service.popularity >= popularityRange[0] && service.popularity <= popularityRange[1]
    );
    setFilteredServices(result);
  }, [categoryFilter, complexityRange, impactRange, popularityRange]);

  const categories = ["all", ...Array.from(new Set(allServices.map(s => s.category)))];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Tech Services"
        subtitle="Comprehensive technology solutions for government and industry"
        description="Explore our full suite of AI-powered services designed to transform your operations and drive innovation."
        videoSrc="/37713-414754681.mp4"
      />
      
      {/* Services Section - Dark Gray */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Tech Services
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive range of technology solutions designed to transform government and enterprise operations.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length === 0 ? (
              <div className="col-span-full text-center text-gray-300 py-16">
                No services match your filters.
              </div>
            ) : (
              filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} contactLink />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Light Gray */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact us to discuss how our tech services can transform your operations and drive innovation.
          </p>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white">
            Contact Us
          </Button>
        </div>
      </section>
      
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-50 h-full w-80 bg-gray-100 dark:bg-gray-800 shadow-lg border-l border-gray-300 dark:border-gray-600 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <span className="text-2xl">×</span>
            </Button>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All" : cat.replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Complexity: {complexityRange[0]} - {complexityRange[1]}</label>
            <Slider min={1} max={5} step={1} value={complexityRange} onValueChange={setComplexityRange} />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Impact: {impactRange[0]} - {impactRange[1]}</label>
            <Slider min={1} max={5} step={1} value={impactRange} onValueChange={setImpactRange} />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Popularity: {popularityRange[0]} - {popularityRange[1]}</label>
            <Slider min={1} max={5} step={1} value={popularityRange} onValueChange={setPopularityRange} />
          </div>
          <Button variant="secondary" onClick={() => {
            setCategoryFilter("all");
            setComplexityRange([1, 5]);
            setImpactRange([1, 5]);
            setPopularityRange([1, 5]);
          }}>
            Reset Filters
          </Button>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

// Animations
// Add to src/index.css:
// .animate-fade-in { animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both; }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } } 