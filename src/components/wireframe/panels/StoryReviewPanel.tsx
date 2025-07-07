import React, { useState, useEffect } from 'react';
import { X, Minus, MessageSquare, Send } from 'lucide-react';
import { ChatMessage } from '../chat/ChatMessage';
import { cn } from '@/lib/utils';

interface StoryReviewPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  story?: {
    title: string;
    description: string;
    acceptanceCriteria: string;
    storyPointEstimate: string;
  };
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const StoryReviewPanel: React.FC<StoryReviewPanelProps> = ({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onMaximize,
  story
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Add initial AI greeting when panel opens with a story
  useEffect(() => {
    if (isOpen && story && messages.length === 0) {
      const greeting: Message = {
        id: '1',
        content: `I'm here to help you improve your user story! I can help you:

• Refine the story description for better clarity
• Strengthen acceptance criteria to be more testable
• Suggest improvements for user experience
• Identify potential edge cases or dependencies
• Adjust story point estimates based on complexity

What would you like to work on first?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, story, messages.length]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you'd like help with: "${inputValue}"\n\nLet me analyze your current story and provide specific suggestions. Based on what I see, here are some recommendations...`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  // Minimized state - thin strip
  if (isMinimized) {
    return (
      <div className={cn(
        "fixed right-0 top-0 h-full w-12 bg-white border-l border-gray-200 z-50",
        "transition-all duration-300 ease-out",
        "flex flex-col items-center justify-center",
        "hover:bg-gray-50 cursor-pointer"
      )}
      onClick={onMaximize}
      title="Reopen Story Review Chat"
      >
        <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
        <div className="text-xs text-gray-500 transform -rotate-90 whitespace-nowrap">
          Review Chat
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: Side Panel */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 z-50",
        "transition-all duration-300 ease-out",
        "hidden lg:flex lg:flex-col",
        isOpen && !isMinimized ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Story Review Chat</h3>
            <p className="text-sm text-gray-600">Ask AI to help you improve the overall story, clarify user needs, or generate stronger outcomes.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMinimize}
              className="p-1 rounded hover:bg-gray-100"
              title="Minimize panel"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={{
                type: message.isUser ? 'user' : 'ai',
                content: message.content
              }}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the story, suggest improvements, or request specific changes..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Bottom Drawer */}
      <div className={cn(
        "fixed inset-x-0 bottom-0 h-96 bg-white border-t border-gray-200 z-50",
        "transition-all duration-300 ease-out",
        "flex flex-col lg:hidden",
        isOpen && !isMinimized ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Story Review Chat</h3>
            <p className="text-sm text-gray-600">Ask AI to improve your story</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={{
                type: message.isUser ? 'user' : 'ai',
                content: message.content
              }}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the story..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay background */}
      <div className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
        "transition-opacity duration-300",
        isOpen && !isMinimized ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={onClose} />
    </>
  );
};