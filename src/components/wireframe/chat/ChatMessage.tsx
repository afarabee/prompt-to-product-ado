
import React from 'react';

interface ChatMessageProps {
  message: {
    type: 'user' | 'ai';
    content: string;
    hasActions?: boolean;
    currentContent?: string;
    suggestedContent?: string;
  };
  onAccept?: (action: 'replace' | 'append' | 'edit') => void;
  onReject?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAccept, onReject }) => {
  return (
    <div className={`max-w-[85%] p-3 rounded-lg ${
      message.type === 'user' 
        ? 'bg-blue-600 text-white ml-auto' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      {message.hasActions && message.currentContent && message.suggestedContent ? (
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Current:</p>
            <p className="text-sm text-gray-700 bg-white p-2 rounded border">{message.currentContent}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Suggested:</p>
            <p className="text-sm text-gray-800 bg-blue-50 p-2 rounded border">{message.suggestedContent}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      )}
      
      {message.hasActions && message.type === 'ai' && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button 
            onClick={() => onAccept?.('replace')}
            className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 flex items-center gap-1"
          >
            ✅ Replace Field
          </button>
          <button 
            onClick={() => onAccept?.('append')}
            className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 flex items-center gap-1"
          >
            ➕ Append to Field
          </button>
          <button 
            onClick={() => onAccept?.('edit')}
            className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 flex items-center gap-1"
          >
            ✏️ Edit Before Inserting
          </button>
          <button 
            onClick={onReject}
            className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 flex items-center gap-1"
          >
            ❌ Cancel
          </button>
        </div>
      )}
    </div>
  );
};
