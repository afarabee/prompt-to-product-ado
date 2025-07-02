
import React, { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export const RawInputSection = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);

  return (
    <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Raw Input Section</h2>
        <button
          onClick={() => setIsInputCollapsed(!isInputCollapsed)}
          className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
          style={{ color: '#005AA7' }}
        >
          {isInputCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          <span className="text-sm">{isInputCollapsed ? 'Expand' : 'Collapse'}</span>
        </button>
      </div>
      
      {!isInputCollapsed && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
              Story Input
            </label>
            <textarea 
              className="w-full h-32 p-3 border rounded-lg resize-none" 
              style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}
              placeholder="Enter raw user story idea or prompt here..."
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
            />
            <div className="text-xs text-gray-500 mt-1">
              Write a custom prompt to guide the AI. This builds on any raw input or backend product context provided.
            </div>
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
            />
          </div>
          
          <button className="w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#005AA7' }}>
            <RefreshCw className="w-4 h-4" />
            Generate User Story
          </button>
        </div>
      )}
    </div>
  );
};
