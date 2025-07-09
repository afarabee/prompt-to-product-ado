
import React from 'react';
import { User, Settings, RotateCcw } from 'lucide-react';

export const AppHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b-2" style={{ backgroundColor: '#002153', borderColor: '#808384' }}>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#005AA7' }}>
          <span className="text-white font-bold text-sm">AI</span>
        </div>
        <h1 className="text-xl font-bold text-white">AI-to-ADO Story Creation POC</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white">
          <User className="w-4 h-4" />
          <span className="text-sm">Product Owner</span>
        </div>
        <button className="p-2 rounded hover:bg-blue-800 text-white">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
