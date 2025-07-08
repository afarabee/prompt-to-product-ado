import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, MessageSquare, Send, Undo } from 'lucide-react';
import { ChatMessage } from '../chat/ChatMessage';
import { SuggestionMessage } from '../chat/SuggestionMessage';
import { EditableMessage } from '../chat/EditableMessage';
import { CancellationMessage } from '../chat/CancellationMessage';
import { MultiFieldSuggestion } from '../chat/MultiFieldSuggestion';
import { ConfirmationToast } from '../chat/ConfirmationToast';
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
  suggestion?: {
    affectedField: string;
    currentValue: string;
  };
  multiFieldSuggestions?: Array<{
    fieldName: string;
    currentValue: string;
    suggestedContent: string;
  }>;
  messageType?: 'regular' | 'suggestion' | 'multiField' | 'cancellation' | 'confirmation';
  isEditing?: boolean;
  editContent?: string;
  canceled?: boolean;
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
  const [actionLoading, setActionLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [confirmations, setConfirmations] = useState<Array<{
    id: string;
    fieldName: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    const container = scrollContainerRef.current || mobileScrollContainerRef.current;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, confirmations]);

  // Ensure scroll after typing stops
  useEffect(() => {
    if (!isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

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

    // Simulate AI response with suggestion
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Here's a stronger version of the Description:\n\n"As a product owner, I want role-based user management with mobile-friendly controls and exportable audit logs, so I can securely manage team access across devices."`,
        isUser: false,
        timestamp: new Date(),
        messageType: 'suggestion',
        suggestion: {
          affectedField: 'Description',
          currentValue: story?.description || ''
        }
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

  const handleSuggestionAction = (action: 'replace' | 'edit' | 'cancel', message: Message) => {
    if (action === 'cancel') {
      // Add cancellation message to chat
      const cancellationMessage: Message = {
        id: `cancel-${Date.now()}`,
        content: `Change suggestion for ${message.suggestion?.affectedField} was canceled.`,
        isUser: false,
        timestamp: new Date(),
        messageType: 'cancellation',
        canceled: true
      };
      setMessages(prev => [...prev, cancellationMessage]);
      return;
    }

    if (action === 'edit') {
      // Switch to editing mode
      setEditingMessageId(message.id);
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { 
              ...msg, 
              isEditing: true, 
              editContent: message.content.split('\n\n')[1]?.replace(/"/g, '') || message.content 
            }
          : msg
      ));
      return;
    }

    if (!message.suggestion) return;

    setActionLoading(true);

    // Highlight the field
    const highlightEvent = new CustomEvent('highlightField', {
      detail: { fieldName: message.suggestion.affectedField.toLowerCase() }
    });
    window.dispatchEvent(highlightEvent);

    setTimeout(() => {
      if (action === 'replace') {
        // Update the field
        const updateEvent = new CustomEvent('updateFieldFromAI', {
          detail: {
            fieldName: message.suggestion.affectedField.toLowerCase(),
            action: 'replace',
            suggestedContent: message.content.split('\n\n')[1]?.replace(/"/g, '') || message.content
          }
        });
        window.dispatchEvent(updateEvent);

        // Add confirmation message to chat
        const confirmationMessage: Message = {
          id: `confirm-${Date.now()}`,
          content: '',
          isUser: false,
          timestamp: new Date(),
          messageType: 'confirmation'
        };
        setMessages(prev => [...prev, confirmationMessage]);

        // Add to confirmations state
        setConfirmations(prev => [...prev, {
          id: `confirm-${Date.now()}`,
          fieldName: message.suggestion.affectedField,
          message: `${message.suggestion.affectedField} has been updated.`,
          timestamp: new Date()
        }]);

        // Auto-hide confirmation after 10 seconds
        setTimeout(() => {
          setConfirmations(prev => prev.slice(1));
        }, 10000);
      }

      setActionLoading(false);
    }, 250);
  };

  const handleEditApply = (messageId: string, editedContent: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message?.suggestion) return;

    setActionLoading(true);

    // Highlight the field
    const highlightEvent = new CustomEvent('highlightField', {
      detail: { fieldName: message.suggestion.affectedField.toLowerCase() }
    });
    window.dispatchEvent(highlightEvent);

    setTimeout(() => {
      // Update the field with edited content
      const updateEvent = new CustomEvent('updateFieldFromAI', {
        detail: {
          fieldName: message.suggestion.affectedField.toLowerCase(),
          action: 'replace',
          suggestedContent: editedContent
        }
      });
      window.dispatchEvent(updateEvent);

      // Add confirmation message
      const confirmationMessage: Message = {
        id: `confirm-${Date.now()}`,
        content: '',
        isUser: false,
        timestamp: new Date(),
        messageType: 'confirmation'
      };
      setMessages(prev => [...prev, confirmationMessage]);

      // Add to confirmations
      setConfirmations(prev => [...prev, {
        id: `confirm-${Date.now()}`,
        fieldName: message.suggestion.affectedField,
        message: `${message.suggestion.affectedField} has been updated.`,
        timestamp: new Date()
      }]);

      // Exit editing mode
      setEditingMessageId(null);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isEditing: false, editContent: undefined }
          : msg
      ));

      setActionLoading(false);
    }, 250);
  };

  const handleEditCancel = (messageId: string) => {
    setEditingMessageId(null);
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isEditing: false, editContent: undefined }
        : msg
    ));
  };

  const handleUndo = (confirmationId: string) => {
    const confirmation = confirmations.find(c => c.id === confirmationId);
    if (!confirmation) return;

    const undoEvent = new CustomEvent('triggerUndo', {
      detail: { fieldName: confirmation.fieldName.toLowerCase() }
    });
    window.dispatchEvent(undoEvent);

    // Add undo message to chat
    const undoMessage: Message = {
      id: `undo-${Date.now()}`,
      content: `↩️ Reverted changes to ${confirmation.fieldName}.`,
      isUser: false,
      timestamp: new Date(),
      messageType: 'regular'
    };
    setMessages(prev => [...prev, undoMessage]);

    // Remove confirmation
    setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
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
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.messageType === 'cancellation' ? (
                <CancellationMessage
                  fieldName={message.content.split('Change suggestion for ')[1]?.split(' was canceled.')[0] || 'Field'}
                  timestamp={message.timestamp}
                />
              ) : message.messageType === 'confirmation' ? (
                // Skip rendering confirmation messages here, they're handled below
                null
              ) : message.isEditing ? (
                <EditableMessage
                  content={message.editContent || message.content}
                  affectedField={message.suggestion?.affectedField || 'Field'}
                  onApply={(editedContent) => handleEditApply(message.id, editedContent)}
                  onCancel={() => handleEditCancel(message.id)}
                  isLoading={actionLoading}
                />
              ) : message.multiFieldSuggestions ? (
                <MultiFieldSuggestion
                  suggestions={message.multiFieldSuggestions}
                  messageId={message.id}
                  onReplace={(fieldName, content) => {
                    // Handle multi-field replace
                    console.log('Multi-field replace:', fieldName, content);
                  }}
                  onEdit={(fieldName, content) => {
                    // Handle multi-field edit
                    console.log('Multi-field edit:', fieldName, content);
                  }}
                  onCancel={(fieldName) => {
                    // Handle multi-field cancel
                    console.log('Multi-field cancel:', fieldName);
                  }}
                  isLoading={actionLoading}
                />
              ) : message.suggestion ? (
                <SuggestionMessage
                  content={message.content}
                  affectedField={message.suggestion.affectedField}
                  currentValue={message.suggestion.currentValue}
                  onReplace={() => handleSuggestionAction('replace', message)}
                  onEdit={() => handleSuggestionAction('edit', message)}
                  onCancel={() => handleSuggestionAction('cancel', message)}
                  isLoading={actionLoading}
                />
              ) : (
                <ChatMessage
                  message={{
                    type: message.isUser ? 'user' : 'ai',
                    content: message.content
                  }}
                />
              )}
            </div>
          ))}
          
          {/* Confirmation Messages */}
          {confirmations.map((confirmation) => (
            <div key={confirmation.id} className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-green-800 font-medium">
                    ✅ {confirmation.message}
                  </span>
                </div>
                
                <button
                  onClick={() => handleUndo(confirmation.id)}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  title="Undo this change"
                >
                  <Undo className="w-3 h-3" />
                  Undo
                </button>
              </div>
            </div>
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
          
          <div ref={messagesEndRef} />
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
              rows={3}
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
        <div ref={mobileScrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.messageType === 'cancellation' ? (
                <CancellationMessage
                  fieldName={message.content.split('Change suggestion for ')[1]?.split(' was canceled.')[0] || 'Field'}
                  timestamp={message.timestamp}
                />
              ) : message.messageType === 'confirmation' ? (
                null
              ) : message.isEditing ? (
                <EditableMessage
                  content={message.editContent || message.content}
                  affectedField={message.suggestion?.affectedField || 'Field'}
                  onApply={(editedContent) => handleEditApply(message.id, editedContent)}
                  onCancel={() => handleEditCancel(message.id)}
                  isLoading={actionLoading}
                />
              ) : message.suggestion ? (
                <SuggestionMessage
                  content={message.content}
                  affectedField={message.suggestion.affectedField}
                  currentValue={message.suggestion.currentValue}
                  onReplace={() => handleSuggestionAction('replace', message)}
                  onEdit={() => handleSuggestionAction('edit', message)}
                  onCancel={() => handleSuggestionAction('cancel', message)}
                  isLoading={actionLoading}
                />
              ) : (
                <ChatMessage
                  message={{
                    type: message.isUser ? 'user' : 'ai',
                    content: message.content
                  }}
                />
              )}
            </div>
          ))}
          
          {/* Confirmation Messages */}
          {confirmations.map((confirmation) => (
            <div key={confirmation.id} className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-green-800 font-medium">
                    ✅ {confirmation.message}
                  </span>
                </div>
                
                <button
                  onClick={() => handleUndo(confirmation.id)}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  title="Undo this change"
                >
                  <Undo className="w-3 h-3" />
                  Undo
                </button>
              </div>
            </div>
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
          
          <div ref={messagesEndRef} />
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
              rows={3}
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