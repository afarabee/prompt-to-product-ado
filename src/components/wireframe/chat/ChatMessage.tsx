
import React from 'react';

interface ChatMessageProps {
  message: {
    type: 'user' | 'ai';
    content: string;
    hasActions?: boolean;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`max-w-[80%] p-3 rounded-lg ${
      message.type === 'user' 
        ? 'bg-blue-600 text-white ml-auto' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      <p className="text-sm">{message.content}</p>
      
      {message.hasActions && message.type === 'ai' && (
        <div className="flex gap-2 mt-3">
          <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
            Accept
          </button>
          <button className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
            Reject
          </button>
        </div>
      )}
    </div>
  );
};
