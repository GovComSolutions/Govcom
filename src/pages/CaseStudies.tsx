import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowDownToLine, X, Filter } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  article: string;
  industry: string;
  challenge: string;
  technology: string;
}

interface AdminDocument {
  id: string;
  title: string;
  description: string;
  kpi: string;
  file: string;
  fileName: string;
  fileType: string;
}

interface AdminUseCase {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  technology: string;
  impact: string;
}

// Original hardcoded case studies (fallback)
const originalCaseStudies = [
  {
    id: "modernization",
    title: "Digital Modernization for Federal Agency",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "How GovCom Solutions helped a federal agency modernize legacy systems, improve security, and boost efficiency.",
  },
  {
    id: "healthcare-ai",
    title: "AI-Driven Insights in Healthcare",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    description: "Leveraging AI to improve patient outcomes and streamline operations for a major healthcare provider.",
  },
  {
    id: "state-cloud",
    title: "Cloud Migration for State Government",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Seamless migration to the cloud for a state government, enabling agility and cost savings.",
  },
  {
    id: "financial-rpa",
    title: "RPA Transformation in Financial Services",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    description: "Implementing robotic process automation to drive efficiency and compliance in the financial sector.",
  },
];

// Add filter options
const industries = ["All", "Federal", "Healthcare", "State", "Financial"];
const challenges = ["All", "Modernization", "Compliance", "Efficiency", "Innovation"];
const technologies = ["All", "AI", "Cloud", "RPA", "Analytics"];

// Sample Blog/Podcasts/Whitepapers
const blogEntries = [
  { type: "Blog", title: "How AI is Transforming Government", url: "#" },
  { type: "Podcast", title: "Modernization in the Public Sector", url: "#" },
  { type: "Whitepaper", title: "Best Practices for Cloud Migration", url: "#" },
];

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedChallenge, setSelectedChallenge] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminCaseStudies, setAdminCaseStudies] = useState<AdminCaseStudy[]>([]);
  const [adminDocuments, setAdminDocuments] = useState<AdminDocument[]>([]);
  const [adminUseCases, setAdminUseCases] = useState<AdminUseCase[]>([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<AdminCaseStudy | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Custom select style for black text in all modes
  const selectClass = "w-full rounded px-2 py-1 border text-black dark:text-black bg-white dark:bg-white";

  // Load admin data from localStorage
  useEffect(() => {
    const storedCaseStudies = localStorage.getItem('caseStudies');
    const storedDocuments = localStorage.getItem('documents');
    const storedUseCases = localStorage.getItem('useCases');
    if (storedCaseStudies) {
      setAdminCaseStudies(JSON.parse(storedCaseStudies));
    }
    if (storedDocuments) {
      setAdminDocuments(JSON.parse(storedDocuments));
    }
    if (storedUseCases) {
      setAdminUseCases(JSON.parse(storedUseCases));
    }
  }, []);

  // Combine original and admin case studies
  const allCaseStudies = [
    ...originalCaseStudies.map(cs => ({
      ...cs,
      isAdmin: false,
      subtitle: '',
      article: '',
      industry: '',
      challenge: '',
      technology: '',
    })),
    ...adminCaseStudies.map(cs => ({
      ...cs,
      isAdmin: true,
    }))
  ];

  // Filtering logic
  const filteredCaseStudies = allCaseStudies.filter(cs => {
    if (cs.isAdmin) {
      // For admin case studies, use the stored tags
      const matchIndustry = selectedIndustry === "All" || cs.industry === selectedIndustry;
      const matchChallenge = selectedChallenge === "All" || cs.challenge === selectedChallenge;
      const matchTechnology = selectedTechnology === "All" || cs.technology === selectedTechnology;
      return matchIndustry && matchChallenge && matchTechnology;
    } else {
      // For original case studies, use the old logic
      const tags = {
        modernization: { industry: "Federal", challenge: "Modernization", technology: "Cloud" },
        "healthcare-ai": { industry: "Healthcare", challenge: "Efficiency", technology: "AI" },
        "state-cloud": { industry: "State", challenge: "Innovation", technology: "Cloud" },
        "financial-rpa": { industry: "Financial", challenge: "Compliance", technology: "RPA" },
      };
      const tag = tags[cs.id];
      const matchIndustry = selectedIndustry === "All" || (tag && tag.industry === selectedIndustry);
      const matchChallenge = selectedChallenge === "All" || (tag && tag.challenge === selectedChallenge);
      const matchTechnology = selectedTechnology === "All" || (tag && tag.technology === selectedTechnology);
      return matchIndustry && matchChallenge && matchTechnology;
    }
  });

  const handleReadMore = (caseStudy: any) => {
    if (caseStudy.isAdmin) {
      setSelectedCaseStudy(caseStudy);
      setShowModal(true);
    } else {
      // For original case studies, navigate to the individual page
      window.location.href = `/case-studies/${caseStudy.id}`;
    }
  };

  const handleDocumentDownload = (doc: AdminDocument) => {
    // Create a download link from base64
    const link = document.createElement('a');
    link.href = doc.file;
    link.download = doc.fileName || doc.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Case Studies"
        subtitle="Real-world solutions that drive measurable results"
        videoSrc="/vecteezy_business-team-meeting-present-investor-colleagues_35099200.mp4"
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Filter Button */}
        <section className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-end">
              <Button 
                onClick={() => setSidebarOpen(true)}
                variant="outline" 
                className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Filter className="h-4 w-4" />
                Filter Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCaseStudies.length === 0 ? (
              <div className="col-span-full text-center text-gray-300 py-12 text-lg">No case studies match your filters.</div>
            ) : (
              filteredCaseStudies.map(cs => (
                <Card key={cs.id} className="flex flex-col h-full animate-fade-in bg-gray-700 border border-gray-600 text-white">
                  <img src={cs.image} alt={cs.title} className="rounded-t-lg w-full h-40 object-cover" />
                  <CardHeader className="flex-1">
                    <CardTitle className="text-lg font-bold mb-2 text-white">{cs.title}</CardTitle>
                    {cs.subtitle && <div className="text-sm text-gray-300 mb-2">{cs.subtitle}</div>}
                    <CardDescription className="text-gray-200">{cs.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <button 
                      onClick={() => handleReadMore(cs)}
                      className="ml-auto px-4 py-1.5 text-sm rounded-lg border border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Read More
                    </button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Downloadable Documents Section */}
        {adminDocuments.length > 0 && (
          <section className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-2xl font-bold mb-4">Downloadable Resources & KPI Snapshots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminDocuments.map((document) => (
                  <Card key={document.id} className="bg-card border border-border">
                    <CardContent className="flex flex-col aspect-square p-6">
                      <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <ArrowDownToLine className="h-8 w-8 text-primary mb-4" />
                        <h4 className="font-semibold mb-2">{document.title}</h4>
                        {document.description && (
                          <p className="text-sm text-muted-foreground mb-2">{document.description}</p>
                        )}
                        {document.kpi && (
                          <div className="text-sm text-green-600 dark:text-green-400 mb-4 font-medium">{document.kpi}</div>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDocumentDownload(document)}
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AI in Action: Use Case Gallery */}
        {adminUseCases.length > 0 && (
          <section className="bg-gray-800 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-2xl font-bold mb-4 text-white">AI in Action: Use Case Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminUseCases.map((useCase) => (
                  <Card key={useCase.id} className="bg-gray-700 border border-gray-600 overflow-hidden text-white">
                    <img src={useCase.image} alt={useCase.title} className="w-full h-32 object-cover" />
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 text-white">{useCase.title}</h4>
                      <p className="text-sm text-gray-200 mb-3">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {useCase.category && (
                          <span className="border border-primary text-primary px-2 py-1 rounded">{useCase.category}</span>
                        )}
                        {useCase.technology && (
                          <span className="border border-primary text-primary px-2 py-1 rounded">{useCase.technology}</span>
                        )}
                        {useCase.impact && (
                          <span className="border border-primary text-primary px-2 py-1 rounded">{useCase.impact}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 transition-opacity" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-[#19232a] shadow-lg border-l border-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filter Case Studies</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Challenge</label>
                <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {challenges.map(challenge => (
                      <SelectItem key={challenge} value={challenge}>{challenge}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Technology</label>
                <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent>
                    {technologies.map(technology => (
                      <SelectItem key={technology} value={technology}>{technology}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-auto pt-6">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedChallenge("All");
                  setSelectedTechnology("All");
                }}
                className="w-full mb-2"
              >
                Reset Filters
              </Button>
              <Button 
                onClick={() => setSidebarOpen(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </aside>

      </main>

      {/* Case Study Modal */}
      {showModal && selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCaseStudy.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{selectedCaseStudy.subtitle}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <img 
                src={selectedCaseStudy.image} 
                alt={selectedCaseStudy.title} 
                className="w-full max-h-96 object-contain rounded-lg mb-6 bg-gray-100 dark:bg-gray-700"
              />
              
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere leading-relaxed">{selectedCaseStudy.article}</div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {selectedCaseStudy.industry && <span>Industry: {selectedCaseStudy.industry}</span>}
                  {selectedCaseStudy.challenge && <span>Challenge: {selectedCaseStudy.challenge}</span>}
                  {selectedCaseStudy.technology && <span>Technology: {selectedCaseStudy.technology}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 