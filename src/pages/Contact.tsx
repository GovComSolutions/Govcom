
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeader from "@/components/PageHeader";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you"
        videoSrc="/946146-hd_1920_1080_30fps.mp4"
      />
      <main className="flex-1">
        {/* Contact Information & Form - Light Section */}
        <section className="bg-gray-100 py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-fade-in [animation-delay:100ms]">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.contact.getInTouch}</h2>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{t.contact.address}</h3>
                      <p className="text-gray-700">
                        10010 Calla Ct.<br />
                        Laurel, Maryland 20723
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{t.contact.phone}</h3>
                      <p className="text-gray-700">410-695-6181</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{t.contact.email}</h3>
                      <p className="text-gray-700">info@govcomsolutions.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{t.contact.receptionHours}</h3>
                      <p className="text-gray-700">
                        Monday - Sunday: 24 hours<br />
                        {t.contact.checkInTime}<br />
                        {t.contact.checkOutTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-gray-300">
                  <iframe 
                    src="https://www.google.com/maps?q=10010+Calla+Ct,+Laurel,+Maryland+20723&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Location Map"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.contact.sendMessage}</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.fullName}</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.email}</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.contact.phoneNumber}</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 8900" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">{t.contact.subject}</Label>
                          <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Inquiry" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contact.message}</Label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t.contact.howCanWeHelp} className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 bg-white text-gray-900" required />
                      </div>
                      <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                        <Send className="mr-2 h-4 w-4" />
                        {t.contact.send}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.contact.messageSent}</h3>
                      <p className="text-gray-700 mb-6">
                        {t.contact.thankYou}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Dark */}
        <section className="bg-gray-800 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 text-white">{t.contact.faq}</h2>
              <p className="text-gray-300">{t.contact.faqSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:200ms]">
              {["checkInOut","parking","pets","breakfast","transfers","amenities"].map((key, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 rounded-xl p-6 text-white">
                  <h3 className="font-semibold text-lg mb-2">{t.contact.questions[key].question}</h3>
                  <p className="text-gray-200">{t.contact.questions[key].answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
