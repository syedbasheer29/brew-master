import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateResponse } from '../utils/chatbot';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      content: "Hello! I'm your coffee expert assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Generate bot response
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const botMessage = {
        role: 'bot',
        content: response.content,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      // If there are follow-up suggestions, add them after a short delay
      if (response.followUp) {
        setTimeout(() => {
          const suggestionsMessage = {
            role: 'bot',
            content: 'You might also want to consider:',
            timestamp: new Date(),
            suggestions: response.followUp,
          };
          setMessages((prev) => [...prev, suggestionsMessage]);
        }, 500);
      }
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brown-600 text-white p-4 rounded-full shadow-lg hover:bg-brown-700 transition pulse-ring animate-float"
        aria-label="Chat with Coffee Expert"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col transform transition-all duration-300 ease-in-out">
          <div className="bg-brown-600 text-white p-4 rounded-t-lg">
            <h3 className="font-bold">Coffee Expert Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02] ${
                    message.role === 'user'
                      ? 'bg-brown-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <div>{message.content}</div>
                  {message.suggestions && (
                    <div className="mt-2 space-y-2">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setInput(suggestion);
                            handleSend();
                          }}
                          className="block w-full text-left px-3 py-2 text-sm bg-white rounded hover:bg-gray-50 transition transform hover:scale-[1.02]"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="text-sm">Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-brown-600 focus:ring-2 focus:ring-brown-200 transition-all duration-200"
              />
              <button
                onClick={handleSend}
                className="bg-brown-600 text-white p-2 rounded-full hover:bg-brown-700 transition transform hover:scale-110 active:scale-95"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}