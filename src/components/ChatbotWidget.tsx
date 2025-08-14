import React, { useState, useRef } from 'react';

// Gemini API endpoint and placeholder for API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyB09LEtlW48pfDd1TzI5E1nrlBLXNukpvg'; // <-- Paste your Gemini API key here

const initialMessages = [
  { role: 'bot', content: 'Hi! I’m the GovCom Solutions Assistant. Ask me anything about our company, services, or solutions.' }
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

  // Gemini API call
  async function sendMessageToGemini(question: string) {
    setLoading(true);
    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      });
      const data = await res.json();
      console.log('Gemini API response:', data); // <-- Debug log
      if (data.error) {
        setMessages((msgs) => [...msgs, { role: 'bot', content: `Error: ${data.error.message}` }]);
      } else {
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not find an answer.';
        setMessages((msgs) => [...msgs, { role: 'bot', content: answer }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: 'bot', content: 'Sorry, there was an error connecting to the chatbot.' }]);
    }
    setLoading(false);
  }

  // Handle user message
  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setInput(''); // Clear input immediately
    await sendMessageToGemini(input);
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
          className="rounded-full shadow-lg bg-primary text-white w-14 h-14 flex items-center justify-center hover:bg-primary/80 transition"
          onClick={handleOpen}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".2"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
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
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">Thinking…</div>}
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
