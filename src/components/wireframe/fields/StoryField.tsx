
import React from 'react';
import { RefreshCw, Copy, Eye, MessageSquare } from 'lucide-react';
import { DiffHighlight } from '../ui/DiffHighlight';

interface StoryFieldProps {
  label: string;
  fieldName: string;
  value: string;
  hasChanges?: boolean;
  changeCount?: number;
  needsUpdate?: boolean;
}

export const StoryField: React.FC<StoryFieldProps> = ({ 
  label, 
  fieldName, 
  value, 
  hasChanges = false, 
  changeCount = 0,
  needsUpdate = false 
}) => {
  const openFieldChat = () => {
    console.log(`Opening chat for ${fieldName}`);
    // This would trigger the chat drawer to open with field context
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
        <div className="flex gap-1">
          <button className="p-1 rounded hover:bg-blue-50" title={`Regenerate ${label}`}>
            <RefreshCw className="w-3 h-3" style={{ color: '#005AA7' }} />
          </button>
          <button className="p-1 rounded hover:bg-blue-50" title="Copy field">
            <Copy className="w-3 h-3" style={{ color: '#005AA7' }} />
          </button>
          <button className="p-1 rounded hover:bg-blue-50" title="Preview">
            <Eye className="w-3 h-3" style={{ color: '#005AA7' }} />
          </button>
        </div>
      </div>
      
      <div className={`p-3 rounded border-2 ${needsUpdate ? 'border-orange-400' : 'border-gray-300'}`} 
           style={{ backgroundColor: '#FFFFFF', borderColor: needsUpdate ? '#F97316' : '#808384' }}>
        {hasChanges ? (
          <DiffHighlight text={value} />
        ) : (
          <div className="text-sm whitespace-pre-wrap">{value}</div>
        )}
        
        {hasChanges && (
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{changeCount} changes</span>
            <button className="text-xs text-green-600 hover:underline">Preview Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};
