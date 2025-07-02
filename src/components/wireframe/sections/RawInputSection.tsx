
import React, { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface RawInputSectionProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export const RawInputSection: React.FC<RawInputSectionProps> = ({ 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const [startOver, setStartOver] = useState(false);

  const handleStartOver = () => {
    setStartOver(true);
    // Reset form fields
    setTimeout(() => setStartOver(false), 100);
  };

  const handleToggleCollapse = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="p-4 rounded-lg border-2 bg-gray-50" style={{ borderColor: '#808384' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Raw Input Section</h2>
          <button
            onClick={handleToggleCollapse}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
            style={{ color: '#005AA7' }}
          >
            <ChevronDown className="w-4 h-4" />
            <span className="text-sm">Expand</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Raw Input Section</h2>
        <div className="flex gap-2">
          <button
            onClick={handleStartOver}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
            style={{ color: '#005AA7' }}
            title="Start Over"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Start Over</span>
          </button>
          <button
            onClick={handleToggleCollapse}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
            style={{ color: '#005AA7' }}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-sm">Collapse</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
            Story Input
          </label>
          <textarea 
            className="w-full h-32 p-3 border rounded-lg resize-none" 
            style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}
            placeholder="Describe the feature, idea, or pain point in plain language.&#10;Examples:&#10;• Users can't find archived tasks&#10;• Add a button to duplicate a request&#10;• Make reports exportable to CSV&#10;Don't worry about the format--AI will handle that."
            key={startOver ? 'reset' : 'normal'}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
            Custom Prompt
          </label>
          <textarea 
            className="w-full h-40 p-3 border rounded-lg resize-none" 
            style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}
            placeholder="Write a custom prompt to guide the AI. This builds on any raw input or backend product context provided."
            rows={6}
            key={startOver ? 'reset-prompt' : 'normal-prompt'}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
            Upload Supporting Files
          </label>
          <input 
            type="file" 
            multiple
            className="w-full p-2 border rounded" 
            style={{ borderColor: '#808384' }}
            key={startOver ? 'reset-files' : 'normal-files'}
          />
          <div className="text-xs text-gray-500 mt-1">
            Optional. Upload screenshots, mockups, docs, or other references. Accepted formats: PDF, PNG, DOCX, TXT. Max 10MB.
          </div>
        </div>
        
        <button className="w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#005AA7' }}>
          <RefreshCw className="w-4 h-4" />
          Generate User Story
        </button>
      </div>
    </div>
  );
};
