
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StoryFieldProps {
  label: string;
  fieldName: string;
  value: string;
  placeholder?: string;
  inputType?: 'text' | 'textarea';
  rows?: number;
  helperText?: string;
  isHighlighted?: boolean;
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
  isHighlighted = false,
  onChange
}) => {

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center gap-2 mb-2">
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
        </div>
        
        <div 
          className={`p-3 rounded border-2 transition-all duration-300 ${
            isHighlighted 
              ? 'ring-2 ring-blue-400 animate-pulse border-blue-400' 
              : 'border-gray-400'
          }`} 
          style={{ backgroundColor: '#FFFFFF' }}
          title={isHighlighted ? "This section will be updated if you click Apply" : undefined}
        >
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
