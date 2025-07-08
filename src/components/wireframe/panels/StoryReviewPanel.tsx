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
    actionType?: 'replace' | 'edit' | 'cancel';
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

  // Handle Start Over event from AppLayout
  useEffect(() => {
    const handleStartOver = () => {
      setMessages([]);
      setConfirmations([]);
      setEditingMessageId(null);
      setInputValue('');
      setIsTyping(false);
      setActionLoading(false);
    };

    window.addEventListener('startOverStoryChat', handleStartOver);
    return () => window.removeEventListener('startOverStoryChat', handleStartOver);
  }, []);

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

  const handleTestMultiField = () => {
    setIsTyping(true);

    setTimeout(() => {
      const multiFieldResponse: Message = {
        id: Date.now().toString(),
        content: "I've analyzed your story and have suggestions for multiple fields to make it more comprehensive:",
        isUser: false,
        timestamp: new Date(),
        messageType: 'multiField',
        multiFieldSuggestions: [
          {
            fieldName: 'Title',
            currentValue: story?.title || '',
            suggestedContent: 'Role-Based User Management with Mobile Support'
          },
          {
            fieldName: 'Description', 
            currentValue: story?.description || '',
            suggestedContent: 'As a product owner, I want comprehensive role-based user management with mobile-friendly controls and audit logging capabilities, so I can securely manage team access across all devices while maintaining compliance and security standards.'
          },
          {
            fieldName: 'Acceptance Criteria',
            currentValue: story?.acceptanceCriteria || '',
            suggestedContent: '• Admin can assign roles (Admin, Manager, User, Viewer) to team members\n• System displays confirmation when user permissions are updated\n• Interface adapts to mobile devices with touch-friendly controls\n• Admin can export user access reports in CSV format\n• All user management actions are logged with timestamp and admin ID\n• Role changes trigger email notifications to affected users\n• System enforces minimum one admin user at all times'
          }
        ]
      };
      setMessages(prev => [...prev, multiFieldResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionAction = (action: 'replace' | 'edit' | 'cancel', message: Message) => {
    // Remove the suggestion message immediately
    setMessages(prev => prev.filter(msg => msg.id !== message.id));

    if (action === 'cancel') {
      // Add cancellation confirmation
      const confirmationId = `cancel-${Date.now()}`;
      setConfirmations(prev => [...prev, {
        id: confirmationId,
        fieldName: message.suggestion?.affectedField || 'Field',
        message: `Suggestion dismissed.`,
        timestamp: new Date(),
        actionType: 'cancel'
      }]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
      }, 5000);
      
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

        // Add to confirmations state with auto-dismiss
        const confirmationId = `confirm-${Date.now()}`;
        setConfirmations(prev => [...prev, {
          id: confirmationId,
          fieldName: message.suggestion.affectedField,
          message: `${message.suggestion.affectedField} has been successfully replaced.`,
          timestamp: new Date(),
          actionType: 'replace'
        }]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
        }, 5000);
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

      // Add to confirmations with auto-dismiss
      const confirmationId = `confirm-${Date.now()}`;
      setConfirmations(prev => [...prev, {
        id: confirmationId,
        fieldName: message.suggestion.affectedField,
        message: `Edited ${message.suggestion.affectedField} saved successfully.`,
        timestamp: new Date(),
        actionType: 'edit'
      }]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
      }, 5000);

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

  // Desktop minimized state - enhanced sticky tab
  if (isMinimized) {
    return (
      <>
        {/* Desktop: Enhanced sticky tab */}
        <div className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 w-16 h-32 z-50",
          "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-l-lg shadow-lg",
          "flex flex-col items-center justify-center gap-2",
          "hover:from-blue-100 hover:to-blue-150 cursor-pointer transition-all duration-200",
          "hidden lg:flex"
        )}
        onClick={onMaximize}
        title="Reopen Story Review Chat"
        >
          <div className="text-2xl">💬</div>
          <span className="text-xs font-medium text-blue-700 text-center leading-tight">
            Review<br/>Chat
          </span>
        </div>

        {/* Mobile: Floating action button */}
        <div className={cn(
          "fixed bottom-20 right-4 w-14 h-14 z-50",
          "bg-blue-600 rounded-full shadow-lg",
          "flex items-center justify-center",
          "hover:bg-blue-700 cursor-pointer transition-colors duration-200",
          "lg:hidden"
        )}
        onClick={onMaximize}
        title="Reopen Story Review Chat"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
      </>
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
              title="Minimize Story Review Chat"
            >
              <Minus className="w-4 h-4" />
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
                    setActionLoading(true);
                    
                    // Highlight the field
                    const highlightEvent = new CustomEvent('highlightField', {
                      detail: { fieldName: fieldName.toLowerCase() }
                    });
                    window.dispatchEvent(highlightEvent);
                    
                    setTimeout(() => {
                      // Update the field
                      const updateEvent = new CustomEvent('updateFieldFromAI', {
                        detail: {
                          fieldName: fieldName.toLowerCase(),
                          action: 'replace',
                          suggestedContent: content
                        }
                      });
                      window.dispatchEvent(updateEvent);
                      
                      // Add confirmation
                       const confirmationId = `confirm-${Date.now()}-${fieldName}`;
                       setConfirmations(prev => [...prev, {
                         id: confirmationId,
                         fieldName,
                         message: `${fieldName} has been updated.`,
                         timestamp: new Date(),
                         actionType: 'replace'
                       }]);

                       // Auto-dismiss after 5 seconds
                       setTimeout(() => {
                         setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
                       }, 5000);
                      
                      setActionLoading(false);
                    }, 250);
                  }}
                  onEdit={(fieldName, content) => {
                    // For multi-field edit, we'll apply the content directly for now
                    // In a full implementation, this would open an edit dialog
                    setActionLoading(true);
                    
                    const highlightEvent = new CustomEvent('highlightField', {
                      detail: { fieldName: fieldName.toLowerCase() }
                    });
                    window.dispatchEvent(highlightEvent);
                    
                    setTimeout(() => {
                      const updateEvent = new CustomEvent('updateFieldFromAI', {
                        detail: {
                          fieldName: fieldName.toLowerCase(),
                          action: 'replace',
                          suggestedContent: content
                        }
                      });
                      window.dispatchEvent(updateEvent);
                      
                       const confirmationId = `confirm-${Date.now()}-${fieldName}`;
                       setConfirmations(prev => [...prev, {
                         id: confirmationId,
                         fieldName,
                         message: `${fieldName} has been updated (after edit).`,
                         timestamp: new Date(),
                         actionType: 'edit'
                       }]);

                       // Auto-dismiss after 5 seconds
                       setTimeout(() => {
                         setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
                       }, 5000);
                      
                      setActionLoading(false);
                    }, 250);
                  }}
                  onCancel={(fieldName) => {
                    // Add cancellation message for this specific field
                    const cancellationMessage: Message = {
                      id: `cancel-${Date.now()}-${fieldName}`,
                      content: `Change suggestion for ${fieldName} was canceled.`,
                      isUser: false,
                      timestamp: new Date(),
                      messageType: 'cancellation',
                      canceled: true
                    };
                    setMessages(prev => [...prev, cancellationMessage]);
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
          {confirmations.map((confirmation) => {
            const getActionIcon = () => {
              switch(confirmation.actionType) {
                case 'edit': return '📝';
                case 'cancel': return '✖️';
                default: return '✅';
              }
            };

            return (
              <div key={confirmation.id} className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-green-800 font-medium">
                      {getActionIcon()} {confirmation.message}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setConfirmations(prev => prev.filter(c => c.id !== confirmation.id))}
                      className="p-1 text-green-600 hover:text-green-800 hover:bg-green-200 rounded transition-colors"
                      title="Dismiss"
                    >
                      <X className="w-3 h-3" />
                    </button>
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
              </div>
            );
          })}
          
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
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleTestMultiField}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
              title="Test multi-field suggestions"
            >
              Test Multi-Field
            </button>
          </div>
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
            onClick={onMinimize}
            className="p-1 rounded hover:bg-gray-100"
            title="Minimize Story Review Chat"
          >
            <Minus className="w-4 h-4" />
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
          {confirmations.map((confirmation) => {
            const getActionIcon = () => {
              switch(confirmation.actionType) {
                case 'edit': return '📝';
                case 'cancel': return '✖️';
                default: return '✅';
              }
            };

            return (
              <div key={confirmation.id} className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-green-800 font-medium">
                      {getActionIcon()} {confirmation.message}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setConfirmations(prev => prev.filter(c => c.id !== confirmation.id))}
                      className="p-1 text-green-600 hover:text-green-800 hover:bg-green-200 rounded transition-colors"
                      title="Dismiss"
                    >
                      <X className="w-3 h-3" />
                    </button>
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
              </div>
            );
          })}
          
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
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleTestMultiField}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
              title="Test multi-field suggestions"
            >
              Test Multi-Field
            </button>
          </div>
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