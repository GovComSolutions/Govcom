import React, { useState, useRef } from 'react';

// Gemini API endpoint and placeholder for API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB09LEtlW48pfDd1TzI5E1nrlBLXNukpvg'; // Use environment variable or fallback

// GovCom Knowledge Base for RAG implementation
const GOVCOM_KNOWLEDGE_BASE = {
  company: {
    name: "GovCom Solutions",
    description: "A modern consulting and technology company specializing in government digital transformation, AI solutions, and process automation.",
    expertise: [
      "Government consulting and digital transformation",
      "AI and Machine Learning solutions",
      "Robotic Process Automation (RPA)",
      "Pega workflow automation",
      "Process discovery and optimization",
      "Organizational effectiveness",
      "Digital solutions and mobile app development",
      "Cloud migration and modernization"
    ]
  },
  services: {
    "AI & Machine Learning": {
      description: "Deploy secure, domain-aligned AI/ML models to power intelligent automation, predictive insights, and mission-critical decisions.",
      features: ["AI Models", "Chatbots", "Predictive Analytics", "Data Extraction"],
      complexity: 5,
      impact: 5
    },
    "Robotic Process Automation (RPA)": {
      description: "Automate high-volume, repetitive tasks with bot-driven workflows tailored to public sector operations.",
      features: ["Bot Development", "Process Mapping", "Audit Trails", "Compliance Integration"],
      complexity: 3,
      impact: 4
    },
    "Pega Workflow Automation": {
      description: "Design and optimize Pega-based solutions for streamlined case management and digital transformation.",
      features: ["Pega Workflow", "Case Management", "Automation", "Platform Optimization"],
      complexity: 3,
      impact: 4
    },
    "Consulting & Process Discovery": {
      description: "Identify gaps, bottlenecks, and innovation opportunities through strategic process analysis.",
      features: ["Process Mapping", "Opportunity Analysis", "Innovation Consulting", "Change Enablement"],
      complexity: 3,
      impact: 4
    },
    "Organizational Effectiveness": {
      description: "Enhance performance and efficiency through targeted assessments and change strategies.",
      features: ["Performance Analysis", "Change Management", "Process Optimization", "Strategy Alignment"],
      complexity: 3,
      impact: 4
    },
    "Digital Solutions": {
      description: "Modernize service delivery with digital platforms designed for scale, usability, and engagement.",
      features: ["Web Portals", "Cloud Integration", "Mobile Platforms", "Scalable Infrastructure"],
      complexity: 4,
      impact: 5
    },
    "Mobile App Development": {
      description: "Develop secure, user-friendly apps for iOS and Android — tailored to government and citizen needs.",
      complexity: 4,
      impact: 5
    }
  },
  caseStudies: [
    {
      title: "Digital Modernization for Federal Agency",
      description: "How GovCom Solutions helped a federal agency modernize legacy systems, improve security, and boost efficiency.",
      industry: "Federal",
      challenge: "Modernization",
      technology: "Cloud",
      impact: "Improved security, boosted efficiency, modernized legacy systems"
    },
    {
      title: "AI-Driven Insights in Healthcare",
      description: "Leveraging AI to improve patient outcomes and streamline operations for a major healthcare provider.",
      industry: "Healthcare",
      challenge: "Innovation",
      technology: "AI",
      impact: "Improved patient outcomes, streamlined operations"
    },
    {
      title: "Cloud Migration for State Government",
      description: "Seamless migration to the cloud for a state government, enabling agility and cost savings.",
      industry: "State",
      challenge: "Modernization",
      technology: "Cloud",
      impact: "Enabled agility, cost savings, improved scalability"
    },
    {
      title: "RPA Transformation in Financial Services",
      description: "Implementing robotic process automation to drive efficiency and compliance in the financial sector.",
      industry: "Financial",
      challenge: "Efficiency",
      technology: "RPA",
      impact: "Improved efficiency, enhanced compliance, automated processes"
    }
  ],
  industries: ["Federal", "Healthcare", "State", "Financial", "Local Government", "Education", "Transportation"],
  technologies: ["AI/ML", "Cloud", "RPA", "Pega", "Analytics", "Mobile", "Web Development", "Process Automation"],
  capabilities: [
    "End-to-end digital transformation consulting",
    "Custom AI and machine learning solutions",
    "Legacy system modernization",
    "Cloud migration and optimization",
    "Process automation and workflow design",
    "Change management and organizational effectiveness",
    "Mobile and web application development",
    "Compliance and security implementation",
    "Performance optimization and analytics",
    "Strategic planning and innovation consulting"
  ]
};

// Message type definition
type Message = {
  role: 'user' | 'bot';
  content: string;
  followUpQuestions?: string[];
};

const initialMessages: Message[] = [
  { 
    role: 'bot', 
    content: 'Hi! I\'m the GovCom Solutions Assistant. I have comprehensive knowledge about our company, services, case studies, and capabilities. Ask me anything about GovCom Solutions, our services, past projects, or how we can help your organization!\n\n💡 Try asking me about:\n• Our AI and RPA services\n• Case studies and past projects\n• Industries we serve\n• Our capabilities and expertise\n• Specific technologies we work with',
    followUpQuestions: [
      "What services do you offer?",
      "Tell me about your case studies",
      "What industries do you serve?"
    ]
  }
];

type Position = {
  left: number | 'auto';
  top: number | 'auto';
  right: number | 'auto';
  bottom: number | 'auto';
  isBottomRight: boolean;
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Set initial position to bottom right
  const [position, setPosition] = useState<Position>({ right: 24, bottom: 24, left: 'auto', top: 'auto', isBottomRight: true });
  const dragRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  type Offset = {
    x: number;
    y: number;
    startRight: number;
    startBottom: number;
    startLeft: number;
    startTop: number;
  };
  const offset = useRef<Offset>({ x: 0, y: 0, startRight: 0, startBottom: 0, startLeft: 0, startTop: 0 });
  const dragging = useRef(false);
  const [lastChatboxRect, setLastChatboxRect] = useState<{right: number, bottom: number} | null>(null);

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    let startX = e.clientX;
    let startY = e.clientY;
    let startRight = typeof position.right === 'number' ? position.right : 0;
    let startBottom = typeof position.bottom === 'number' ? position.bottom : 0;
    let startLeft = typeof position.left === 'number' ? position.left : 0;
    let startTop = typeof position.top === 'number' ? position.top : 0;
    dragging.current = true;
    offset.current = { x: startX, y: startY, startRight, startBottom, startLeft, startTop };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      // On first drag, switch to left/top positioning for intuitive movement
      if (position.isBottomRight) {
        const left = window.innerWidth - offset.current.startRight - (dragRef.current?.offsetWidth || 0);
        const top = window.innerHeight - offset.current.startBottom - (dragRef.current?.offsetHeight || 0);
        setPosition({ left, top, right: 'auto', bottom: 'auto', isBottomRight: false });
      } else {
        const dx = e.clientX - offset.current.x;
        const dy = e.clientY - offset.current.y;
        setPosition(pos => ({
          left: typeof pos.left === 'number' ? pos.left + dx : 0 + dx,
          top: typeof pos.top === 'number' ? pos.top + dy : 0 + dy,
          right: 'auto',
          bottom: 'auto',
          isBottomRight: false
        }));
        offset.current.x = e.clientX;
        offset.current.y = e.clientY;
      }
    }
  };
  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // RAG: Retrieve relevant information from knowledge base
  function retrieveRelevantInfo(question: string): string {
    const questionLower = question.toLowerCase();
    let relevantInfo = '';
    
    console.log('RAG: Processing question:', question); // Debug log
    
    // Check for company-related questions
    if (questionLower.includes('company') || questionLower.includes('govcom') || questionLower.includes('about')) {
      relevantInfo += `Company: ${GOVCOM_KNOWLEDGE_BASE.company.description}\n`;
      relevantInfo += `Expertise: ${GOVCOM_KNOWLEDGE_BASE.company.expertise.join(', ')}\n\n`;
    }
    
    // Check for service-related questions
    if (questionLower.includes('service') || questionLower.includes('offer') || questionLower.includes('provide')) {
      relevantInfo += 'Services:\n';
      Object.entries(GOVCOM_KNOWLEDGE_BASE.services).forEach(([name, service]) => {
        relevantInfo += `- ${name}: ${service.description}\n`;
      });
      relevantInfo += '\n';
    }
    
    // Check for specific services
    if (questionLower.includes('ai') || questionLower.includes('machine learning') || questionLower.includes('ml')) {
      const aiService = GOVCOM_KNOWLEDGE_BASE.services["AI & Machine Learning"];
      relevantInfo += `AI & Machine Learning Service:\n${aiService.description}\nFeatures: ${aiService.features.join(', ')}\n\n`;
    }
    
    if (questionLower.includes('rpa') || questionLower.includes('robotic') || questionLower.includes('automation')) {
      const rpaService = GOVCOM_KNOWLEDGE_BASE.services["Robotic Process Automation (RPA)"];
      relevantInfo += `RPA Service:\n${rpaService.description}\nFeatures: ${rpaService.features.join(', ')}\n\n`;
    }
    
    if (questionLower.includes('pega') || questionLower.includes('workflow')) {
      const pegaService = GOVCOM_KNOWLEDGE_BASE.services["Pega Workflow Automation"];
      relevantInfo += `Pega Service:\n${pegaService.description}\nFeatures: ${pegaService.features.join(', ')}\n\n`;
    }
    
    // Check for case study questions
    if (questionLower.includes('case study') || questionLower.includes('project') || questionLower.includes('experience') || questionLower.includes('example')) {
      relevantInfo += 'Case Studies:\n';
      GOVCOM_KNOWLEDGE_BASE.caseStudies.forEach(study => {
        relevantInfo += `- ${study.title}: ${study.description}\n  Industry: ${study.industry}, Challenge: ${study.challenge}, Technology: ${study.technology}\n  Impact: ${study.impact}\n\n`;
      });
    }
    
    // Check for industry questions
    if (questionLower.includes('industry') || questionLower.includes('sector')) {
      relevantInfo += `Industries we serve: ${GOVCOM_KNOWLEDGE_BASE.industries.join(', ')}\n\n`;
    }
    
    // Check for technology questions
    if (questionLower.includes('technology') || questionLower.includes('tech') || questionLower.includes('tools')) {
      relevantInfo += `Technologies we work with: ${GOVCOM_KNOWLEDGE_BASE.technologies.join(', ')}\n\n`;
    }
    
    // Check for capability questions
    if (questionLower.includes('capability') || questionLower.includes('can do') || questionLower.includes('expertise')) {
      relevantInfo += `Our Capabilities:\n${GOVCOM_KNOWLEDGE_BASE.capabilities.map(cap => `- ${cap}`).join('\n')}\n\n`;
    }
    
    // If no specific matches, provide general company info
    if (!relevantInfo) {
      relevantInfo = `I'm here to help with information about GovCom Solutions. We specialize in:\n${GOVCOM_KNOWLEDGE_BASE.company.expertise.join(', ')}\n\nAsk me about our services, case studies, industries we serve, or specific capabilities!`;
    }
    
    console.log('RAG: Retrieved info:', relevantInfo); // Debug log
    return relevantInfo;
  }

  // Generate relevant follow-up questions based on the conversation context
  function generateFollowUpQuestions(question: string, response: string): string[] {
    const questionLower = question.toLowerCase();
    const responseLower = response.toLowerCase();
    
    // Define follow-up questions based on different topics
    const followUpQuestions: { [key: string]: string[] } = {
      'services': [
        "Would you like to know more about our AI & Machine Learning capabilities?",
        "Are you interested in our RPA automation solutions?",
        "Would you like to hear about our Pega workflow automation?",
        "Do you need help with cloud migration or modernization?"
      ],
      'case studies': [
        "Would you like to hear about more case studies in your industry?",
        "Are you interested in similar projects we've completed?",
        "Would you like to discuss how we can apply these solutions to your organization?",
        "Do you have questions about the technologies used in these projects?"
      ],
      'industries': [
        "Would you like to know more about our experience in your specific industry?",
        "Are you interested in industry-specific solutions we offer?",
        "Would you like to discuss compliance requirements for your sector?",
        "Do you need help with industry-specific challenges?"
      ],
      'ai capabilities': [
        "Would you like to know more about our machine learning models?",
        "Are you interested in AI implementation strategies?",
        "Would you like to discuss AI governance and compliance?",
        "Do you need help with data preparation for AI projects?"
      ],
      'rpa': [
        "Would you like to know more about our RPA implementation process?",
        "Are you interested in RPA training for your team?",
        "Would you like to discuss RPA maintenance and support?",
        "Do you need help identifying processes suitable for automation?"
      ],
      'pega': [
        "Would you like to know more about our Pega development process?",
        "Are you interested in Pega training and certification?",
        "Would you like to discuss Pega integration with existing systems?",
        "Do you need help with Pega workflow design?"
      ],
      'general': [
        "Would you like to schedule a consultation with our team?",
        "Are you interested in learning more about our pricing?",
        "Would you like to discuss your specific project requirements?",
        "Do you have questions about our team's expertise?"
      ]
    };

    // Determine the most relevant category based on the question and response
    let category = 'general';
    
    if (questionLower.includes('service') || questionLower.includes('offer') || responseLower.includes('service')) {
      category = 'services';
    } else if (questionLower.includes('case study') || questionLower.includes('project') || responseLower.includes('case study')) {
      category = 'case studies';
    } else if (questionLower.includes('industry') || questionLower.includes('sector') || responseLower.includes('industry')) {
      category = 'industries';
    } else if (questionLower.includes('ai') || questionLower.includes('machine learning') || responseLower.includes('ai')) {
      category = 'ai capabilities';
    } else if (questionLower.includes('rpa') || questionLower.includes('robotic') || responseLower.includes('rpa')) {
      category = 'rpa';
    } else if (questionLower.includes('pega') || questionLower.includes('workflow') || responseLower.includes('pega')) {
      category = 'pega';
    }

    // Return 2-3 relevant follow-up questions
    const questions = followUpQuestions[category];
    return questions.slice(0, 3);
  }

  // Enhanced Gemini API call with RAG
  async function sendMessageToGemini(question: string) {
    setLoading(true);
    try {
      // Retrieve relevant information from knowledge base
      const relevantInfo = retrieveRelevantInfo(question);
      
      // Create enhanced prompt with context
      const enhancedPrompt = `You are the GovCom Solutions Assistant. Use the following information about GovCom Solutions to answer the user's question accurately and helpfully:

${relevantInfo}

User Question: ${question}

Please provide a helpful, accurate response based on the information above. If the user asks about something not covered in the information, politely redirect them to ask about GovCom's services, case studies, or capabilities. Keep responses professional, informative, and focused on how GovCom can help.`;

      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: enhancedPrompt }] }],
        }),
      });
      const data = await res.json();
      console.log('Gemini API response:', data); // <-- Debug log
      if (data.error) {
        const errorMsg = `Error: ${data.error.message}`;
        const followUps = generateFollowUpQuestions(question, errorMsg);
        setMessages((msgs) => [...msgs, { role: 'bot', content: errorMsg, followUpQuestions: followUps }]);
      } else {
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not find an answer.';
        const followUps = generateFollowUpQuestions(question, answer);
        setMessages((msgs) => [...msgs, { role: 'bot', content: answer, followUpQuestions: followUps }]);
      }
    } catch (err) {
      const errorMsg = 'Sorry, there was an error connecting to the chatbot.';
      const followUps = generateFollowUpQuestions(question, errorMsg);
      setMessages((msgs) => [...msgs, { role: 'bot', content: errorMsg, followUpQuestions: followUps }]);
    }
    setLoading(false);
  }

  // Handle quick access questions (immediate response)
  const handleQuickQuestion = async (question: string) => {
    setMessages((msgs) => [...msgs, { role: 'user', content: question }]);
    
    try {
      await sendMessageToGemini(question);
    } catch (err) {
      // Fallback: provide basic information from knowledge base
      const relevantInfo = retrieveRelevantInfo(question);
      const fallbackResponse = `I'm having trouble connecting to my AI service right now, but I can tell you about GovCom Solutions based on my knowledge base:\n\n${relevantInfo}\n\nPlease try again later for more detailed responses, or contact our team directly.`;
      const followUps = generateFollowUpQuestions(question, fallbackResponse);
      setMessages((msgs) => [...msgs, { role: 'bot', content: fallbackResponse, followUpQuestions: followUps }]);
    }
  };

  // Handle user message
  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setInput(''); // Clear input immediately
    
    try {
      await sendMessageToGemini(input);
    } catch (err) {
      // Fallback: provide basic information from knowledge base
      const relevantInfo = retrieveRelevantInfo(input);
      const fallbackResponse = `I'm having trouble connecting to my AI service right now, but I can tell you about GovCom Solutions based on my knowledge base:\n\n${relevantInfo}\n\nPlease try again later for more detailed responses, or contact our team directly.`;
      const followUps = generateFollowUpQuestions(input, fallbackResponse);
      setMessages((msgs) => [...msgs, { role: 'bot', content: fallbackResponse, followUpQuestions: followUps }]);
    }
  };

  // Open chat and align chat window's bottom right to button's bottom right
  const handleOpen = () => {
    if (buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const chatWidth = 320; // fixed width
      const chatHeight = 400; // fixed height
      // Align chatbox bottom right to button bottom right
      const left = btnRect.right - chatWidth;
      const top = btnRect.bottom - chatHeight;
      setPosition({ left, top, right: 'auto', bottom: 'auto', isBottomRight: false });
    } else if (position.isBottomRight) {
      // Convert default bottom right to left/top
      const chatWidth = 320;
      const chatHeight = 400;
      const left = window.innerWidth - 24 - chatWidth;
      const top = window.innerHeight - 24 - chatHeight;
      setPosition({ left, top, right: 'auto', bottom: 'auto', isBottomRight: false });
    }
    setOpen(true);
  };

  // Close chat and move button to bottom right of chatbox
  const handleClose = () => {
    if (chatRef.current) {
      const chatRect = chatRef.current.getBoundingClientRect();
      setLastChatboxRect({ right: chatRect.right, bottom: chatRect.bottom });
    }
    setOpen(false);
  };

  // When chat closes, use lastChatboxRect to position the button
  React.useEffect(() => {
    if (!open && lastChatboxRect && buttonRef.current) {
      const btnWidth = buttonRef.current.offsetWidth || 56;
      const btnHeight = buttonRef.current.offsetHeight || 56;
      const left = lastChatboxRect.right - btnWidth;
      const top = lastChatboxRect.bottom - btnHeight;
      setPosition({ left, top, right: 'auto', bottom: 'auto', isBottomRight: false });
      setLastChatboxRect(null);
    }
  }, [open, lastChatboxRect]);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  return (
    <div
      ref={dragRef}
      style={{
        position: 'fixed',
        left: position.left,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        zIndex: 1000,
        cursor: 'grab',
      }}
      onMouseDown={onMouseDown}
      className="select-none"
    >
      {/* Chatbot Button */}
      {!open && (
        <button
          ref={buttonRef}
          aria-label="Open chatbot"
          className="rounded-full shadow-lg bg-primary text-white w-14 h-14 flex items-center justify-center hover:bg-primary/80 transition-all duration-300 hover:scale-110 hover:shadow-xl relative"
          onClick={handleOpen}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" opacity=".1"/>
            <path d="M8 9h8M8 13h6M8 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          {/* Online indicator dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div
          ref={chatRef}
          className="bg-background border border-border rounded-xl shadow-2xl flex flex-col"
          style={{ width: 320, height: 400, minWidth: 320, minHeight: 400, maxWidth: 320, maxHeight: 400 }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-primary text-white rounded-t-xl">
            <span className="font-semibold">GovCom Chatbot</span>
            <button onClick={handleClose} className="text-white hover:text-gray-200 text-xl">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <span className={msg.role === 'user' ? 'inline-block bg-primary text-white rounded-lg px-2 py-0.5 my-1 text-sm' : 'inline-block bg-muted text-foreground rounded-lg px-2 py-0.5 my-1 text-sm'}>
                  {msg.content}
                </span>
                
                {/* Follow-up questions for bot messages */}
                {msg.role === 'bot' && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-muted-foreground">💡 You might also want to ask:</div>
                    <div className="flex flex-wrap gap-2">
                      {msg.followUpQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-md transition-colors border border-blue-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">Thinking…</div>}
            
            {/* Quick Access Buttons for Common Questions */}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 mt-4">
                <div className="text-xs text-muted-foreground">Quick questions:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What services do you offer?",
                    "Tell me about your case studies",
                    "What industries do you serve?",
                    "What are your AI capabilities?"
                  ].map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-muted hover:bg-muted/80 text-foreground px-2 py-1 rounded-md transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center border-t border-border px-2 py-2 bg-background rounded-b-xl">
            <input
              className="flex-1 rounded-lg border border-border px-2 py-1 mr-2 bg-card text-foreground focus:outline-none text-sm"
              placeholder="Ask about GovCom Solutions…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              disabled={loading}
            />
            <button
              className="bg-primary text-white rounded-lg px-3 py-1.5 font-semibold hover:bg-primary/80 transition text-sm"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
