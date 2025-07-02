
import React from 'react';

interface ChatMessageProps {
  message: {
    type: 'user' | 'ai';
    content: string;
    hasActions?: boolean;
  };
  onAccept?: () => void;
  onReject?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAccept, onReject }) => {
  return (
    <div className={`max-w-[85%] p-3 rounded-lg ${
      message.type === 'user' 
        ? 'bg-blue-600 text-white ml-auto' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      
      {message.hasActions && message.type === 'ai' && (
        <div className="flex gap-2 mt-3">
          <button 
            onClick={onAccept}
            className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200"
          >
            Accept Changes
          </button>
          <button 
            onClick={onReject}
            className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
          >
            Reject Changes
          </button>
          <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
            Modify Further
          </button>
        </div>
      )}
    </div>
  );
};
