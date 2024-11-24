import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  text: string;
  isBot: boolean;
}

const genAI = new GoogleGenerativeAI('AIzaSyAEpXyr6VOJYPWOqRW15_lYdN-uMJZGmVk');

const SYSTEM_PROMPT = `You are an HS Code classification expert. Your role is to help users classify their products with the correct HS codes.
When a user describes a product, provide:
1. The most appropriate HS code
2. A brief explanation of why this classification is correct
3. Any important notes about the classification

Keep responses concise and focused on HS code classification.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your HS Code Assistant. I can help you classify your products with the correct HS codes. What product would you like to classify?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [SYSTEM_PROMPT],
          },
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { text, isBot: true }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { text: "I'm sorry, but I encountered an error. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-amazon-orange hover:bg-amazon-orange-dark text-white shadow-lg transition-all duration-200 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 border-b bg-amazon-gray text-white rounded-t-lg">
          <h3 className="font-semibold">HS Code Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot 
                  ? 'bg-amazon-gray-light text-gray-800' 
                  : 'bg-amazon-orange text-white'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-amazon-gray-light text-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
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
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-2 ${isLoading ? 'bg-gray-400' : 'bg-amazon-orange hover:bg-amazon-orange-dark'} text-white rounded-lg`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}