
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-4">GovCom Solutions</h4>
            <p className="text-muted-foreground mb-4">
              Do you have further questions about our services? Feel free to connect with us.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  10010 Calla Ct.<br />
                  Laurel, Maryland 20723
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="text-muted-foreground">410-695-6181</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-muted-foreground">info@govcomsolutions.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Tech Services", path: "/ai-services" },
                { name: "AI Center of Excellence", path: "/ai-center" },
                { name: "Industries", path: "/industries" },
                { name: "Case Studies", path: "/case-studies" },
                { name: "Partners", path: "/partners" },
                { name: "Careers", path: "/careers" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} GovCom Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
