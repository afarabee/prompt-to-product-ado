import React, { useState } from 'react';
import { Check, Edit, X, ChevronDown, ChevronUp } from 'lucide-react';
import { DiffView } from './DiffView';

interface SuggestionMessageProps {
  content: string;
  affectedField: string;
  currentValue: string;
  onReplace: () => void;
  onEdit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SuggestionMessage: React.FC<SuggestionMessageProps> = ({
  content,
  affectedField,
  currentValue,
  onReplace,
  onEdit,
  onCancel,
  isLoading = false
}) => {
  const [showDiff, setShowDiff] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-gray-800">{content}</p>
        <p className="text-sm text-gray-600">
          Suggested edits apply to: <strong>{affectedField} Field</strong>
        </p>
      </div>

      {/* What Changed Toggle */}
      <button
        onClick={() => setShowDiff(!showDiff)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        {showDiff ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        What changed? {showDiff ? 'Hide preview' : 'Show preview'}
      </button>

      {/* Diff View */}
      {showDiff && (
        <DiffView
          originalContent={currentValue}
          newContent={content.split('\n\n').slice(1).join('\n\n') || content}
          fieldName={affectedField}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={onReplace}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="w-4 h-4" />
          Replace Section
        </button>
        
        <button
          onClick={onEdit}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Before Replacing
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
          Processing...
        </div>
      )}
    </div>
  );
};