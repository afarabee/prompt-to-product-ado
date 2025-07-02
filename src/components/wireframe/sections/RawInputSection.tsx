
import React, { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export const RawInputSection = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);

  return (
    <div className="space-y-4">
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  AI Model
                </label>
                <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
                  <option>GPT-4</option>
                  <option>GPT-3.5-turbo</option>
                  <option>Custom Model</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  Custom Prompt
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  style={{ borderColor: '#808384' }}
                  placeholder="Optional custom prompt"
                />
              </div>
            </div>
            
            <button className="w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#005AA7' }}>
              <RefreshCw className="w-4 h-4" />
              Generate User Story
            </button>
          </div>
        )}
      </div>

      {!isInputCollapsed && (
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#002153' }}>OpenAI Configuration</h3>
          <div className="text-xs space-y-1" style={{ color: '#333333' }}>
            <div>• Prompt Engineering Settings</div>
            <div>• Temperature & Token Controls</div>
            <div>• Model Performance Metrics</div>
          </div>
        </div>
      )}
    </div>
  );
};
