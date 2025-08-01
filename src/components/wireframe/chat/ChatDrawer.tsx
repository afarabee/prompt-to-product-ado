
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Lightbulb } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface ChatDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen: externalIsOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [activeFieldLabel, setActiveFieldLabel] = useState<string | null>(null);
  const [isStoryReviewMode, setIsStoryReviewMode] = useState(false);
  const [storyContext, setStoryContext] = useState<{title: string, description: string, acceptanceCriteria: string, storyPointEstimate: string} | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string, hasActions?: boolean, currentContent?: string, suggestedContent?: string, isStoryReplace?: boolean}>>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showReplaceWarning, setShowReplaceWarning] = useState(false);
  const [replaceWarningContent, setReplaceWarningContent] = useState('');
  
  // Ref for chat container scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle external control of drawer
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
      if (externalIsOpen && !activeField) {
        // When opened from navigation, show welcome message
        setActiveField(null);
        setActiveFieldLabel(null);
        setMessages([{
          type: 'ai',
          content: "Hi! I can help you write or revise any part of your user story. What would you like help with?"
        }]);
      }
    }
  }, [externalIsOpen]);

  useEffect(() => {
    const handleOpenFieldChat = (event: CustomEvent) => {
      const { fieldName, label } = event.detail;
      setActiveField(fieldName);
      setActiveFieldLabel(label);
      setIsStoryReviewMode(false);
      setStoryContext(null);
      setIsOpen(true);
      
      // Add initial greeting message only
      const sampleMessages = [
        {
          type: 'ai' as const,
          content: `Hi! I'm here to help you refine the ${label.toLowerCase()} field. What specific changes would you like to make?`
        }
      ];
      
      setMessages(sampleMessages);
      setInputValue('');
    };

    const handleOpenStoryReviewChat = (event: CustomEvent) => {
      const { title, description, acceptanceCriteria, storyPointEstimate } = event.detail;
      setActiveField(null);
      setActiveFieldLabel(null);
      setIsStoryReviewMode(true);
      setStoryContext({ title, description, acceptanceCriteria, storyPointEstimate });
      setIsOpen(true);
      
      // Create story review starter message with empty fields
      const storyContent = `Title: ${title || '(Empty)'}

Description: ${description || '(Empty)'}

Acceptance Criteria: ${acceptanceCriteria || '(Empty)'}

Story Point Estimate: ${storyPointEstimate || '(Empty)'}`;
      
      const storyMessages = [
        {
          type: 'ai' as const,
          content: `Here's your current story draft. What would you like to refine or update?

${storyContent}`
        }
      ];
      
      setMessages(storyMessages);
      setInputValue('');
    };

    const handleShowReplaceWarning = (event: CustomEvent) => {
      const { content } = event.detail;
      setReplaceWarningContent(content);
      setShowReplaceWarning(true);
    };

    window.addEventListener('openFieldChat', handleOpenFieldChat as EventListener);
    window.addEventListener('openStoryReviewChat', handleOpenStoryReviewChat as EventListener);
    window.addEventListener('showReplaceWarning', handleShowReplaceWarning as EventListener);
    return () => {
      window.removeEventListener('openFieldChat', handleOpenFieldChat as EventListener);
      window.removeEventListener('openStoryReviewChat', handleOpenStoryReviewChat as EventListener);
      window.removeEventListener('showReplaceWarning', handleShowReplaceWarning as EventListener);
    };
  }, []);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen && onClose) {
      onClose();
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      if (isStoryReviewMode) {
        // Generate story review response
        const storyReviewResponse = generateStoryReviewResponse(inputValue);
        setMessages(prev => [...prev, storyReviewResponse]);
      } else {
        // Field-specific response
        const event = new CustomEvent('getFieldValue', { detail: { fieldName: activeField } });
        window.dispatchEvent(event);
        
        const currentContent = getCurrentFieldContent();
        const suggestedContent = generateSuggestionForField(activeField, currentContent);
        
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: `I suggest updating the ${activeFieldLabel?.toLowerCase()} to focus on specific user management features.`,
          hasActions: true,
          currentContent,
          suggestedContent
        }]);
      }
    }, 1000);
  };

  const getCurrentFieldContent = () => {
    // This would get the actual current field content from AppLayout
    // For now, return placeholder that will be replaced with real content
    return "Current field content...";
  };

  const generateSuggestionForField = (fieldName: string | null, currentContent: string) => {
    switch (fieldName) {
      case 'description':
        return "As a product owner, I want comprehensive user management functionality with robust security controls, including multi-factor authentication, role-based permissions, and audit logging so that I can ensure secure access management across the platform.";
      case 'acceptanceCriteria':
        return "• User can assign and modify roles for team members\n• System displays confirmation when permissions are updated\n• Interface includes multi-factor authentication setup\n• Admin can export user access reports in CSV format\n• All user management actions are logged for audit purposes";
      case 'storyPointEstimate':
        return "5";
      case 'title':
        return "Enhanced User Management System with Security Controls";
      default:
        return "Enhanced user story content with AI improvements...";
    }
  };

  const generateStoryReviewResponse = (userInput: string) => {
    // Generate contextual response based on user input
    const responses = [
      {
        type: 'ai' as const,
        content: `I'll help you improve the entire user story based on your feedback. Here's a revised version that addresses your concerns:

Enhanced User Story:

Title: Advanced User Management Platform with Security Controls

Description: As a product owner, I want a comprehensive user management platform with advanced security features, including multi-factor authentication, granular role-based permissions, real-time monitoring, and automated compliance reporting so that I can ensure secure and efficient access management while meeting regulatory requirements.

Acceptance Criteria: 
• System enforces multi-factor authentication for all administrative functions
• Users can be assigned granular roles with customizable permission sets
• Real-time dashboard shows active sessions and security events
• Automated compliance reports are generated monthly with audit trails
• Password policies include complexity requirements and regular rotation
• Session timeout and concurrent login limits are configurable
• All user actions are logged with detailed metadata for forensic analysis

Story Point Estimate: 13

This revision enhances security features, adds compliance aspects, and provides more detailed acceptance criteria.`,
        hasActions: true,
        isStoryReplace: true
      }
    ];
    
    return responses[0];
  };

  const handleAcceptChanges = (action: 'replace' | 'append' | 'edit' | 'replaceStory', editedContent?: string) => {
    console.log(`${action} changes for`, isStoryReviewMode ? 'story review' : activeField);
    
    if (action === 'replaceStory') {
      // Handle full story replacement
      const lastAIMessage = messages.slice().reverse().find(msg => msg.type === 'ai' && msg.hasActions && msg.isStoryReplace);
      if (lastAIMessage) {
        const content = editedContent || lastAIMessage.content;
        const event = new CustomEvent('replaceStoryFromAI', { 
          detail: { content } 
        });
        window.dispatchEvent(event);
        
        setConfirmationMessage('Your story draft has been replaced with the AI suggestion.');
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          setConfirmationMessage('');
        }, 3000);
      }
      return;
    }
    
    // Handle field-specific changes
    const lastAIMessage = messages.slice().reverse().find(msg => msg.type === 'ai' && msg.hasActions);
    const suggestionContent = editedContent || lastAIMessage?.suggestedContent || "Enhanced user story content...";
    
    // Dispatch event to update the field
    const event = new CustomEvent('updateFieldFromAI', { 
      detail: { 
        fieldName: activeField, 
        action, 
        suggestedContent: suggestionContent
      } 
    });
    window.dispatchEvent(event);
    
    // Set appropriate confirmation message
    let message = '';
    switch (action) {
      case 'replace':
        message = 'Your field has been updated with the AI suggestion.';
        break;
      case 'append':
        message = 'The AI suggestion has been appended to this field.';
        break;
      case 'edit':
        message = 'Your field has been updated with your edited AI suggestion.';
        break;
    }
    
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setConfirmationMessage('');
    }, 3000);
  };

  const handleRejectChanges = () => {
    console.log('Rejecting changes for', activeField);
    // Simply dismiss the suggestion without changes
  };

  const handleConfirmReplace = () => {
    const event = new CustomEvent('replaceStoryFromAI', { 
      detail: { content: replaceWarningContent } 
    });
    window.dispatchEvent(event);
    
    setShowReplaceWarning(false);
    setReplaceWarningContent('');
    setConfirmationMessage('Your story draft has been replaced with the AI suggestion.');
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setConfirmationMessage('');
    }, 3000);
  };

  const handleCancelReplace = () => {
    setShowReplaceWarning(false);
    setReplaceWarningContent('');
  };

  return (
    <>
      {/* Chat Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#005AA7' }}>
          <h3 className="text-white font-semibold">
            {isStoryReviewMode ? 'Story Review Chat' : activeFieldLabel ? `Chat: ${activeFieldLabel} Field` : 'AI Chat'}
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
        
        {isStoryReviewMode && (
          <div className="p-3 bg-purple-50 border-b text-sm text-purple-800">
            Review and refine your entire user story
          </div>
        )}

        {/* Chat Content */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-3" 
          style={{ height: 'calc(100vh - 240px)' }}
        >
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              onAccept={handleAcceptChanges}
              onReject={handleRejectChanges}
              confirmationMessage={
                message.hasActions && message.type === 'ai' && showConfirmation && index === messages.length - 1 
                  ? confirmationMessage 
                  : undefined
              }
            />
          ))}
        </div>

        {/* Input Area at Bottom */}
        <div className="border-t bg-white">
          {/* Normal Chat Input */}
          <div className="p-4">
            <div className="flex gap-2 mb-2">
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
            {/* Tooltip below input */}
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <Lightbulb className="w-3 h-3" />
              <span>Try: "Add more detail about..." or "Make it shorter" or "Focus on security aspects"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Replace Warning Modal */}
      {showReplaceWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Replace Your Story Draft?
                </h3>
              </div>
              
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This will completely replace your current story draft including:
                </p>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                  <li>Title</li>
                  <li>Description</li>
                  <li>Acceptance Criteria</li>
                  <li>Story Point Estimate</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">New Story Content Preview:</h4>
                <div className="max-h-60 overflow-y-auto bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
                  {replaceWarningContent}
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelReplace}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReplace}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                >
                  Yes, Replace All Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
