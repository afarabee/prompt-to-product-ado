
import React from 'react';
import { MessageSquare, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StoryFieldProps {
  label: string;
  fieldName: string;
  value: string;
  placeholder?: string;
  inputType?: 'text' | 'textarea';
  rows?: number;
  helperText?: string;
  onChange: (value: string) => void;
}

export const StoryField: React.FC<StoryFieldProps> = ({ 
  label, 
  fieldName, 
  value, 
  placeholder = '',
  inputType = 'text',
  rows = 4,
  helperText = '',
  onChange
}) => {
  const getTooltipText = () => {
    switch (fieldName) {
      case 'description':
        return "Ask AI to generate or improve the story description based on your product context.";
      case 'acceptanceCriteria':
        return "Use AI to suggest testable criteria based on the story description.";
      case 'storyPointEstimate':
        return "AI will suggest a value, but you can override it. This value is not required.";
      default:
        return `Chat with AI about ${label}`;
    }
  };

  const openFieldChat = () => {
    console.log(`Opening chat for ${fieldName}`);
    const event = new CustomEvent('openFieldChat', { detail: { fieldName, label } });
    window.dispatchEvent(event);
  };

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium" style={{ color: '#333333' }}>{label}</label>
            {helperText && (
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{helperText}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <button 
              onClick={openFieldChat}
              className="p-1 rounded hover:bg-blue-50" 
              title={getTooltipText()}
              style={{ color: '#005AA7' }}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-3 rounded border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}>
          {inputType === 'textarea' ? (
            <textarea
              className="w-full border-none outline-none resize-y min-h-20"
              placeholder={placeholder}
              rows={rows}
              style={{ backgroundColor: 'transparent', fontSize: '14px' }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={(e) => e.target.placeholder = ''}
              onBlur={(e) => e.target.placeholder = placeholder}
            />
          ) : (
            <input
              type="text"
              className="w-full border-none outline-none"
              placeholder={placeholder}
              style={{ backgroundColor: 'transparent', fontSize: '14px' }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={(e) => e.target.placeholder = ''}
              onBlur={(e) => e.target.placeholder = placeholder}
            />
          )}
        </div>
        {helperText && (
          <div className="text-xs text-gray-500 mt-1 break-words">
            {helperText}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
