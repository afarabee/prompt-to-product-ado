import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface EditableMessageProps {
  content: string;
  affectedField: string;
  onApply: (editedContent: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EditableMessage: React.FC<EditableMessageProps> = ({
  content,
  affectedField,
  onApply,
  onCancel,
  isLoading = false
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Autofocus and adjust height
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' && (e.metaKey || e.ctrlKey)) || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      handleApply();
    }
  };

  const handleApply = () => {
    if (editedContent.trim() && !isLoading) {
      onApply(editedContent.trim());
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Editing suggestion for: <strong>{affectedField} Field</strong>
        </p>
        <p className="text-xs text-gray-500">
          Press Cmd/Ctrl + Enter or click Apply to save changes
        </p>
      </div>

      {/* Editable Content */}
      <div className="space-y-3">
        <textarea
          ref={textareaRef}
          value={editedContent}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg resize-y min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Edit the suggestion..."
          disabled={isLoading}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={handleApply}
          disabled={isLoading || !editedContent.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="w-4 h-4" />
          Apply Changes
        </button>
        
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          Applying changes...
        </div>
      )}
    </div>
  );
};