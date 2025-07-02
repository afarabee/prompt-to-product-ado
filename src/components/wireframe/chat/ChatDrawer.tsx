
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

export const ChatDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    setInputValue('');
    
    // Simulate AI response with Accept/Reject buttons
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: `Here's my suggestion for the ${activeField || 'story'}:`,
        hasActions: true
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button - Repositioned */}
      <button
        onClick={toggleChat}
        className="fixed top-20 left-80 z-50 p-2 rounded-lg font-medium text-white"
        style={{ backgroundColor: '#005AA7' }}
        title="Open AI Chat"
      >
        ?AI Chat
      </button>

      {/* Chat Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '360px' }}
      >
        {/* Header with clear X button */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#005AA7' }}>
          <h3 className="text-white font-semibold">AI Chat</h3>
          <button
            onClick={toggleChat}
            className="text-white hover:bg-blue-700 rounded p-1"
            title="Close AI Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 rounded text-white"
              style={{ backgroundColor: '#005AA7' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleChat}
        />
      )}
    </>
  );
};
