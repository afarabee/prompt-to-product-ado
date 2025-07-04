
import React, { useState } from 'react';
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
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAccept, onReject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showReplaceConfirmation, setShowReplaceConfirmation] = useState(false);

  const handleEditClick = () => {
    setEditedContent(message.suggestedContent || message.content || '');
    setIsEditing(true);
  };

  const handleApplyEdit = () => {
    if (message.isStoryReplace) {
      onAccept?.('replaceStory', editedContent);
    } else {
      onAccept?.('edit', editedContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const handleReplaceStoryClick = () => {
    // Trigger enhanced warning dialog in ChatDrawer
    const event = new CustomEvent('showReplaceWarning', { 
      detail: { 
        content: message.content,
        suggestedContent: message.suggestedContent 
      } 
    });
    window.dispatchEvent(event);
  };

  const handleConfirmReplace = () => {
    onAccept?.('replaceStory');
    setShowReplaceConfirmation(false);
  };

  const handleCancelReplace = () => {
    setShowReplaceConfirmation(false);
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
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Current:</p>
              <p className="text-sm text-gray-700 bg-white p-2 rounded border whitespace-pre-wrap">
                {message.currentContent || '(Empty)'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Suggested:</p>
              <p className="text-sm text-gray-800 bg-blue-50 p-2 rounded border whitespace-pre-wrap">{message.suggestedContent}</p>
            </div>
            
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
              // Field-level actions
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => onAccept?.('replace')}
                      className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 flex items-center gap-1"
                    >
                      ✅ Replace Field
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Replace this field with the full AI suggestion.</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => onAccept?.('append')}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 flex items-center gap-1"
                    >
                      ➕ Append to Field
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add the AI suggestion to the end of this field.</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={handleEditClick}
                      className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 flex items-center gap-1"
                    >
                      ✏️ Edit Before Inserting
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Review and edit this suggestion before applying it.</p>
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
                    <p>Discard this suggestion and close the panel.</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        )}
        
      </div>
    </TooltipProvider>
  );
};
