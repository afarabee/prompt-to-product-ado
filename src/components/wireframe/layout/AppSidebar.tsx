
import React from 'react';
import { Users, BarChart3, History, Settings } from 'lucide-react';

export const AppSidebar = () => {
  return (
    <aside className="w-64 border-r-2" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
      <nav className="p-4 space-y-2">
        <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Navigation</div>
        
        <button className="w-full text-left p-3 rounded-lg font-medium" style={{ backgroundColor: '#005AA7', color: 'white' }}>
          Story Generator
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Azure DevOps Integration
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics Dashboard
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Version History
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            User Management
          </div>
        </button>
      </nav>

      <div className="p-4 mt-8 border-t" style={{ borderColor: '#808384' }}>
        <div className="text-sm font-semibold mb-3" style={{ color: '#333333' }}>Active Personas</div>
        <div className="space-y-2">
          <div className="p-2 rounded" style={{ backgroundColor: '#005AA7', color: 'white' }}>
            <div className="text-xs font-medium">Product Owner</div>
            <div className="text-xs opacity-90">Story Creation</div>
          </div>
          <div className="p-2 rounded border" style={{ borderColor: '#808384', color: '#333333' }}>
            <div className="text-xs font-medium">Scrum Team</div>
            <div className="text-xs opacity-70">Review & Refine</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
