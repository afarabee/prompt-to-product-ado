
import React, { useState, useEffect } from 'react';
import { X, Send, Lightbulb } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

export const ChatDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [activeFieldLabel, setActiveFieldLabel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string, hasActions?: boolean}>>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleOpenFieldChat = (event: CustomEvent) => {
      const { fieldName, label } = event.detail;
      setActiveField(fieldName);
      setActiveFieldLabel(label);
      setIsOpen(true);
      setMessages([]);
      setInputValue('');
      
      // Add initial AI message
      setTimeout(() => {
        setMessages([{
          type: 'ai',
          content: `I can help you refine the ${label.toLowerCase()} field. What specific changes would you like to make?`
        }]);
      }, 300);
    };

    window.addEventListener('openFieldChat', handleOpenFieldChat as EventListener);
    return () => window.removeEventListener('openFieldChat', handleOpenFieldChat as EventListener);
  }, []);

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
        content: `I suggest updating the ${activeFieldLabel?.toLowerCase()} to focus on specific user management features. Here's my proposed change:

Current: "Detailed story description following INVEST criteria..."

Suggested: "As a product owner, I want comprehensive user management functionality, including role assignments, permission controls, and mobile responsive interface so that I can efficiently manage team access across all devices."`,
        hasActions: true
      }]);
    }, 1000);
  };

  const handleAcceptChanges = () => {
    console.log('Accepting changes for', activeField);
    // Here you would apply the changes to the actual field
  };

  const handleRejectChanges = () => {
    console.log('Rejecting changes for', activeField);
    // Here you would dismiss the suggestion
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed top-20 left-280 z-50 p-2 rounded-lg font-medium text-white"
        style={{ backgroundColor: '#005AA7', left: '280px' }}
        title="Open AI Chat"
      >
        AI Chat
      </button>

      {/* Chat Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '360px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#005AA7' }}>
          <h3 className="text-white font-semibold">
            {activeFieldLabel ? `Chat: ${activeFieldLabel} Field` : 'AI Chat'}
          </h3>
          <button
            onClick={toggleChat}
            className="text-white hover:bg-blue-700 rounded p-1"
            title="Close AI Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeFieldLabel && (
          <div className="p-3 bg-blue-50 border-b text-sm text-blue-800">
            Refine this field with AI assistance
          </div>
        )}

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              onAccept={handleAcceptChanges}
              onReject={handleRejectChanges}
            />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
            <Lightbulb className="w-3 h-3" />
            <span>Try: "Add more detail about..." or "Make it shorter" or "Focus on security aspects"</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe the changes you want..."
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
