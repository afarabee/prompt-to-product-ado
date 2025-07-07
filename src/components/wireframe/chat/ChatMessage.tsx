
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatMessageProps {
  message: {
    type: 'user' | 'ai';
    content: string;
    hasActions?: boolean;
    currentContent?: string;
    suggestedContent?: string;
    isStoryReplace?: boolean;
  };
  onAccept?: (action: 'replace' | 'append' | 'edit' | 'replaceStory', editedContent?: string) => void;
  onReject?: () => void;
  confirmationMessage?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAccept, onReject, confirmationMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showReplaceConfirmation, setShowReplaceConfirmation] = useState(false);
  const [showCurrentContent, setShowCurrentContent] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [localEditedSuggestion, setLocalEditedSuggestion] = useState<string | null>(null);
  const [showFieldReplaceWarning, setShowFieldReplaceWarning] = useState(false);

  const handleEditClick = () => {
    let contentToEdit = localEditedSuggestion || message.suggestedContent || message.content || '';
    
    // For story replacement, clean out AI explanation text
    if (message.isStoryReplace) {
      const storyStartPattern = /(?:Enhanced User Story:|Title:|\*\*Title:\*\*)/;
      const match = contentToEdit.match(storyStartPattern);
      if (match) {
        contentToEdit = contentToEdit.substring(contentToEdit.indexOf(match[0]));
      }
    }
    
    setEditedContent(contentToEdit);
    setIsEditing(true);
  };

  const handleApplyEdit = () => {
    if (message.isStoryReplace) {
      onAccept?.('replaceStory', editedContent);
      setIsEditing(false);
    } else {
      // For field-level editing, update local state and show action buttons
      setLocalEditedSuggestion(editedContent);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const handleReplaceStoryClick = () => {
    // Extract just the story content without AI explanation text
    let cleanContent = message.content;
    
    // Remove AI explanation text before the actual story content
    const storyStartPattern = /(?:Enhanced User Story:|Title:|\*\*Title:\*\*)/;
    const match = cleanContent.match(storyStartPattern);
    if (match) {
      cleanContent = cleanContent.substring(cleanContent.indexOf(match[0]));
    }
    
    // Trigger enhanced warning dialog in ChatDrawer
    const event = new CustomEvent('showReplaceWarning', { 
      detail: { 
        content: cleanContent,
        suggestedContent: message.suggestedContent 
      } 
    });
    window.dispatchEvent(event);
  };

  const handleFieldReplaceClick = () => {
    setShowFieldReplaceWarning(true);
  };

  const handleConfirmFieldReplace = () => {
    onAccept?.('replace', localEditedSuggestion || undefined);
    setShowFieldReplaceWarning(false);
  };

  const handleCancelFieldReplace = () => {
    setShowFieldReplaceWarning(false);
  };

  return (
    <TooltipProvider>
      <div className={`max-w-[85%] p-3 rounded-lg ${
        message.type === 'user' 
          ? 'bg-blue-600 text-white ml-auto' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {isEditing ? (
          // Inline editing mode
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">
                {message.isStoryReplace ? 'Edit Full Story:' : 'Edit Content:'}
              </p>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-3 border rounded resize-y text-sm font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white mb-4"
                rows={message.isStoryReplace ? 15 : 8}
                placeholder={message.isStoryReplace ? "Edit the full story content here..." : "Edit the content here..."}
                autoFocus
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleApplyEdit();
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    handleCancelEdit();
                  }
                }}
              />
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>{editedContent.length} characters</span>
                <span>Ctrl/Cmd+Enter to apply • Esc to cancel</span>
              </div>
            </div>
            
            {/* Apply/Cancel buttons for inline editing */}
            <div className="flex gap-2">
              <button
                onClick={handleApplyEdit}
                className="text-sm bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 font-medium flex items-center gap-1"
              >
                ✅ Apply Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-1"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : message.hasActions && message.currentContent !== undefined && message.suggestedContent ? (
          <div className="space-y-4">
            {/* Collapsible Current Content */}
            {message.currentContent && message.currentContent.trim() && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowCurrentContent(!showCurrentContent)}
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showCurrentContent ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {showCurrentContent ? 'Hide current content' : 'Show current content'}
                  {!showCurrentContent && (
                    <span className="text-gray-500 font-normal">
                      ({message.currentContent.slice(0, 50)}{message.currentContent.length > 50 ? '...' : ''})
                    </span>
                  )}
                </button>
                {showCurrentContent && (
                  <div className="pl-5">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Current field content:</p>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border whitespace-pre-wrap">
                      {message.currentContent}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Prominently Highlighted AI Suggestion */}
            <div className={`transition-all duration-200 ${
              hoveredButton === 'suggestion' ? 'ring-2 ring-blue-300 ring-opacity-50' : ''
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-bold text-gray-800">AI Suggestion:</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-sm text-gray-800 whitespace-pre-wrap mb-3">
                  {localEditedSuggestion || message.suggestedContent}
                </p>
                {localEditedSuggestion && (
                  <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block mb-2">
                    ✏️ Content edited - ready to apply to field
                  </p>
                )}
                <p className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded inline-block">
                  💡 This content will be applied to the field when you click an action button below
                </p>
              </div>
            </div>
            
            {/* Confirmation Message - appears below AI suggestion */}
            {confirmationMessage && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                ✅ {confirmationMessage}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            
            {/* Confirmation Message for story replacement */}
            {confirmationMessage && message.isStoryReplace && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                ✅ {confirmationMessage}
              </div>
            )}
          </div>
        )}
        
        {message.hasActions && message.type === 'ai' && !isEditing && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.isStoryReplace ? (
              // Story replacement actions
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={handleReplaceStoryClick}
                      className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 flex items-center gap-1"
                    >
                      ✅ Replace Draft
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Replace your current story draft with this AI suggestion.</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={handleEditClick}
                      className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 flex items-center gap-1"
                    >
                      ✏️ Edit Before Replacing
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Review and edit this story before replacing your draft.</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={onReject}
                      className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 flex items-center gap-1"
                    >
                      ❌ Cancel
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discard this suggestion and keep your current draft.</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              // Field-level actions with enhanced UX
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-medium">
                  Apply the AI suggestion to your draft field:
                </p>
                <div className="flex flex-wrap gap-2">
                   <Tooltip>
                     <TooltipTrigger asChild>
                       <button 
                         onClick={handleFieldReplaceClick}
                         onMouseEnter={() => setHoveredButton('suggestion')}
                         onMouseLeave={() => setHoveredButton(null)}
                         className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 flex items-center gap-1 transition-all duration-200"
                       >
                         ✅ Replace Field
                       </button>
                     </TooltipTrigger>
                     <TooltipContent>
                       <p>Replace the field with the AI suggestion shown above</p>
                     </TooltipContent>
                   </Tooltip>
                   
                   <Tooltip>
                     <TooltipTrigger asChild>
                       <button 
                         onClick={() => onAccept?.('append', localEditedSuggestion || undefined)}
                         onMouseEnter={() => setHoveredButton('suggestion')}
                         onMouseLeave={() => setHoveredButton(null)}
                         className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 flex items-center gap-1 transition-all duration-200"
                       >
                         ➕ Append to Field
                       </button>
                     </TooltipTrigger>
                     <TooltipContent>
                       <p>Add the AI suggestion to the end of the current field content</p>
                     </TooltipContent>
                   </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={handleEditClick}
                        onMouseEnter={() => setHoveredButton('suggestion')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 flex items-center gap-1 transition-all duration-200"
                      >
                        ✏️ Edit Before Inserting
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Modify the AI suggestion before applying it to the field</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={onReject}
                        className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 flex items-center gap-1 transition-all duration-200"
                      >
                        ❌ Cancel
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Discard this suggestion and close the panel</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        )}
        
      </div>
      
      {/* Field Replace Confirmation Dialog */}
      {showFieldReplaceWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Replace Field Content?
                </h3>
              </div>
              
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This will completely replace the current field content with the AI suggestion.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">New Content Preview:</h4>
                <div className="max-h-32 overflow-y-auto bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
                  {localEditedSuggestion || message.suggestedContent}
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelFieldReplace}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmFieldReplace}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                >
                  Yes, Replace Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};
