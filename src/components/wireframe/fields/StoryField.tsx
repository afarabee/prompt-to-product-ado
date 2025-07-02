
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface StoryFieldProps {
  label: string;
  fieldName: string;
  value: string;
  placeholder?: string;
  inputType?: 'text' | 'textarea';
  rows?: number;
}

export const StoryField: React.FC<StoryFieldProps> = ({ 
  label, 
  fieldName, 
  value, 
  placeholder = '',
  inputType = 'text',
  rows = 4
}) => {
  const openFieldChat = () => {
    console.log(`Opening chat for ${fieldName}`);
    const event = new CustomEvent('openFieldChat', { detail: { fieldName, label } });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium" style={{ color: '#333333' }}>{label}</label>
          <button 
            onClick={openFieldChat}
            className="p-1 rounded hover:bg-blue-50" 
            title={`Chat with AI about ${label}`}
            style={{ color: '#005AA7' }}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-3 rounded border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}>
        {inputType === 'textarea' ? (
          <textarea
            className="w-full border-none outline-none resize-none text-sm"
            placeholder={placeholder}
            rows={rows}
            style={{ backgroundColor: 'transparent' }}
            defaultValue={value}
          />
        ) : (
          <input
            type="text"
            className="w-full border-none outline-none text-sm"
            placeholder={placeholder}
            style={{ backgroundColor: 'transparent' }}
            defaultValue={value}
          />
        )}
      </div>
    </div>
  );
};
