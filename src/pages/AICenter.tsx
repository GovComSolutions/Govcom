import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

export default function AICenter() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="GovCom AI Center of Excellence (AICOE)"
        subtitle="Where Government Innovation Meets Applied AI"
        description="At GovCom Solutions, our AI Center of Excellence (AICOE) is the innovation nucleus driving secure, scalable, and strategic AI adoption across government and public enterprises."
        videoSrc="/250975_tiny.mp4"
      />
      
      {/* About Section - Light Gray */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              🚀 About the AI COE
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              The AICOE empowers agencies to move from <strong>AI experimentation to transformation</strong>, providing the frameworks, toolkits, and talent needed to implement AI responsibly, efficiently, and with measurable outcomes.
            </p>
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <p className="text-xl italic">
                "We don't just talk about AI — we build it, deploy it, and scale it in mission-critical environments."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Deliver Section - Dark Gray */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              🧩 What We Deliver
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* AI Strategy & Consulting Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Strategy & Consulting</h3>
                <p className="text-blue-200 font-medium">Strategic AI Roadmaps & Governance</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">📋</span>
                    Core Services
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      AI Readiness Assessments & Roadmaps
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Compliance-first AI Governance
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Executive Training on AI Risk
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    🚀 Ready to build your AI strategy?
                  </p>
                  <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                    Schedule Assessment
                  </Button>
                </div>
              </div>
            </div>

            {/* Workflow & Process Automation Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Workflow Automation</h3>
                <p className="text-blue-200 font-medium">AI-Enhanced Process Optimization</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🔧</span>
                    Automation Solutions
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      HR, procurement & compliance workflows
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      n8n, Power Automate integrations
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Prebuilt bots & assistants
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    ⚡ Ready to automate your processes?
                  </p>
                  <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                    Explore Solutions
                  </Button>
                </div>
              </div>
            </div>

            {/* GovCom AI Software & Tools Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Software & Tools</h3>
                <p className="text-blue-200 font-medium">Custom AI Solutions & Agents</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🛠️</span>
                    Our Products
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      RAG-based knowledge agents
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Custom LLM apps for workflows
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Secure GenAI for FOIA & forms
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    🧠 Ready to deploy custom AI?
                  </p>
                  <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                    View Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Reusable Frameworks & Digital Products Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Frameworks & Tools</h3>
                <p className="text-blue-200 font-medium">Open-Source AI Templates</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">📦</span>
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Responsible AI toolkits & governance
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Prompt engineering playbooks
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Red teaming & audit frameworks
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    🔄 Ready to accelerate AI adoption?
                  </p>
                  <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                    Download Toolkit
                  </Button>
                </div>
              </div>
            </div>

            {/* Training & Knowledge Transfer Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Training & Knowledge</h3>
                <p className="text-blue-200 font-medium">Building AI Capabilities</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">📚</span>
                    Programs
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Technical & non-technical AI training
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Prompt engineering bootcamps
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Executive briefings & workshops
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    🎓 Ready to build AI capabilities?
                  </p>
                  <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                    Explore Training
                  </Button>
                </div>
              </div>
            </div>

            {/* Red Hat AI Platform Services Card */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-xl p-6 border border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-4 border-primary">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Red Hat AI Platform</h3>
                <p className="text-blue-200 font-medium">Enterprise-Grade AI Infrastructure</p>
              </div>
              
              <div className="space-y-4">
                {/* Core Capabilities */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🧱</span>
                    Core Capabilities
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      RHEL AI for secure, GPU-enabled workloads
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      OpenShift AI for GenAI & ML workflows
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Air-gapped + cloud-native deployments
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      GPU autoscaling & MLOps with GitOps
                    </div>
                  </div>
                </div>
                
                {/* Why Choose */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🔐</span>
                    Why Choose GovCom + Red Hat?
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      100% open-source stack for AI sovereignty
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Deployment-ready templates & compliance
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      STIG / FIPS / FedRAMP-ready
                    </div>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div className="rounded-lg p-4 text-center border-2 border-primary">
                  <p className="text-white font-semibold mb-3">
                    📞 Ready to deploy Red Hat-powered AI?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button size="sm" className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                      Schedule Consultation
                    </Button>
                    <Button size="sm" variant="outline" className="border-white text-white hover:bg-blue-900 hover:text-white font-medium">
                      Download Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Built for Public Sector Section - Light Gray */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
              🔐 Built for Public Sector
            </h2>
            <p className="text-gray-700 text-lg mb-6 text-center">
              Our AICOE integrates:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Security-first design</h4>
                <p className="text-gray-600">FedRAMP, FISMA, CIS alignment</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Cloud-native architecture</h4>
                <p className="text-gray-600">Azure AI, AWS Bedrock, RHEL AI</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Open innovation</h4>
                <p className="text-gray-600">GitHub, open-source libraries, and shared toolkits</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Equity & Inclusion</h4>
                <p className="text-gray-600">In model design and deployment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sample Use Cases Section - Dark Gray */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
              🧠 Sample Use Cases We Deliver
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Use Case 1 */}
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">Legacy FAQs overwhelm staff</h4>
                <p className="text-gray-200 mb-4">AI-powered chatbot trained on policy PDFs</p>
                <div className="bg-gray-600 rounded p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Solution:</strong> Deploy intelligent FAQ bot that learns from existing documentation and provides instant, accurate responses to common inquiries.
                  </p>
                </div>
              </div>
              
              {/* Use Case 2 */}
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">FOIA document review takes weeks</h4>
                <p className="text-gray-200 mb-4">LLM auto-redaction + classification</p>
                <div className="bg-gray-600 rounded p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Solution:</strong> Automated document processing with AI-powered redaction and classification to reduce processing time from weeks to hours.
                  </p>
                </div>
              </div>
              
              {/* Use Case 3 */}
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">Grants processing is slow</h4>
                <p className="text-gray-200 mb-4">Automated intake + NLP-driven eligibility screening</p>
                <div className="bg-gray-600 rounded p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Solution:</strong> Streamlined grant application processing with intelligent screening and automated eligibility verification.
                  </p>
                </div>
              </div>
              
              {/* Use Case 4 */}
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">New tech intimidates teams</h4>
                <p className="text-gray-200 mb-4">AICOE training + safe pilot environments</p>
                <div className="bg-gray-600 rounded p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Solution:</strong> Comprehensive training programs and controlled pilot environments to build confidence and competence with new AI technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>
      
      {/* CTA Section - Light Gray */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform with AI?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join leading government agencies and enterprises that are already leveraging our AI Center of Excellence to accelerate their digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              🔍 Book a Discovery Call
            </Button>
            <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">
              🧪 Join our AI Pilot Program
            </Button>
          </div>
        </div>
        </section>
      
      <Footer />
    </div>
  );
} 