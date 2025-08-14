
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    // { name: "Home", path: "/" }, // Removed Home tab
    { name: "Tech Services", path: "/ai-services" },
    { name: "AI Center of Excellence", path: "/ai-center" },
    { name: "Industries", path: "/industries" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Partners", path: "/partners" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 group",
      scrolled
        ? "bg-white/80 dark:bg-[#181F2A]/90 backdrop-blur-lg py-3 shadow-md"
        : "bg-transparent py-5"
    )}>
      <div className="absolute left-0 right-0 top-0 bottom-[-2px] z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/60 dark:bg-[#181F2A]/60 shadow-md" />
      <div className="relative">
        <nav className="container flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <img src="/logos/main-logo.png" alt="GovCom Solutions Logo" className="h-10 w-auto max-w-xs" />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 whitespace-nowrap">
            {navLinks.map(link => (
              <li key={link.name} className="relative">
                <Link
                  to={link.path}
                  className="font-semibold px-2 py-1 text-base rounded transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild className="btn-primary">
              <Link to="/contact">{t.nav.bookNow}</Link>
            </Button>
            <Button asChild className="btn-primary">
              <Link to="/admin-login">{t.nav.adminLogin}</Link>
            </Button>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </div>
      {/* Mobile Menu */}
      <div className={cn("fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300", mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")}> 
        <div className={cn("fixed inset-y-0 right-0 w-3/4 max-w-sm bg-card shadow-xl p-6 transition-transform duration-300 ease-in-out", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}> 
          <div className="flex flex-col h-full justify-between"> 
            <div> 
              <div className="flex justify-between mb-8"> 
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full"> 
                  <X className="h-6 w-6" /> 
                </Button> 
              </div> 
              <ul className="space-y-6"> 
                {navLinks.map(link => <li key={link.name}> 
                    <Link to={link.path} className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}> 
                      {link.name} 
                    </Link> 
                  </li>)} 
              </ul> 
            </div> 
            <Button asChild className="w-full btn-primary mt-6"> 
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}> 
                {t.nav.bookNow} 
              </Link> 
            </Button> 
            <Button asChild className="w-full btn-primary mt-2">
              <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.adminLogin}
              </Link>
            </Button>
          </div> 
        </div> 
      </div> 
    </header>
  );
}
