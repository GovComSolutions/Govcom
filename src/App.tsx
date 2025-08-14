
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home1 from "./pages/Home1";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import Apartments from "./pages/Apartments";
import BookingPage from "./pages/BookingPage";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Amenities from "./pages/Amenities";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import AIServices from "./pages/AIServices";
import AICenter from "./pages/AICenter";
import Industries from "./pages/Industries";
import StateIndustry from "./pages/industries/state";
import HealthcareIndustry from "./pages/industries/healthcare";
import FederalIndustry from "./pages/industries/federal";
import FinancialIndustry from "./pages/industries/financial";
import CaseStudies from "./pages/CaseStudies";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import ChatbotWidget from "@/components/ChatbotWidget";
import CaseStudyModernization from "./pages/case-studies/modernization";
import CaseStudyHealthcareAI from "./pages/case-studies/healthcare-ai";
import CaseStudyStateCloud from "./pages/case-studies/state-cloud";
import CaseStudyFinancialRPA from "./pages/case-studies/financial-rpa";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

// Create a react-query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home1" element={<Home1 />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/home3" element={<Home3 />} />
            <Route path="/home4" element={<Home4 />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/ai-services" element={<AIServices />} />
            <Route path="/ai-center" element={<AICenter />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/state" element={<StateIndustry />} />
            <Route path="/industries/healthcare" element={<HealthcareIndustry />} />
            <Route path="/industries/federal" element={<FederalIndustry />} />
            <Route path="/industries/financial" element={<FinancialIndustry />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/modernization" element={<CaseStudyModernization />} />
            <Route path="/case-studies/healthcare-ai" element={<CaseStudyHealthcareAI />} />
            <Route path="/case-studies/state-cloud" element={<CaseStudyStateCloud />} />
            <Route path="/case-studies/financial-rpa" element={<CaseStudyFinancialRPA />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
