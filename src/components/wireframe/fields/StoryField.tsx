
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
  previewMode?: boolean;
}

export const StoryField: React.FC<StoryFieldProps> = ({ 
  label, 
  fieldName, 
  value, 
  placeholder = '',
  inputType = 'text',
  rows = 4,
  helperText = '',
  previewMode = false
}) => {
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
              className="w-full border-none outline-none resize-y text-sm min-h-20"
              placeholder={previewMode ? "" : placeholder}
              rows={rows}
              style={{ backgroundColor: 'transparent' }}
              defaultValue={previewMode ? "" : value}
            />
          ) : (
            <input
              type="text"
              className="w-full border-none outline-none text-sm"
              placeholder={previewMode ? "" : placeholder}
              style={{ backgroundColor: 'transparent' }}
              defaultValue={previewMode ? "" : value}
            />
          )}
        </div>
        {previewMode && helperText && (
          <div className="text-xs text-gray-500 mt-1 break-words">
            {helperText}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
