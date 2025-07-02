
import React from 'react';
import { FileText, Users } from 'lucide-react';

export const AppSidebar = () => {
  return (
    <aside className="w-64 border-r-2" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
      <nav className="p-4 space-y-2">
        <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Navigation</div>
        
        <button className="w-full text-left p-3 rounded-lg font-medium" style={{ backgroundColor: '#005AA7', color: 'white' }}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Story Generator
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          Version History
        </button>
      </nav>
    </aside>
  );
};
