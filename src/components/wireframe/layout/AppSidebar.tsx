
import React from 'react';
import { FileText, Users, History, MessageSquare } from 'lucide-react';

interface AppSidebarProps {
  onVersionHistoryClick?: () => void;
  onUserManagementClick?: () => void;
  onAIChatClick?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  onVersionHistoryClick, 
  onUserManagementClick,
  onAIChatClick 
}) => {
  return (
    <aside className="w-64 border-r-2" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
      <nav className="p-4 space-y-2">
        <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Navigation</div>
        
        <button 
          className="w-full text-left p-3 rounded-lg hover:bg-gray-200" 
          style={{ color: '#333333' }}
          onClick={onAIChatClick}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Ask AI!
          </div>
        </button>
        
        <button className="w-full text-left p-3 rounded-lg font-medium" style={{ backgroundColor: '#005AA7', color: 'white' }}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Story Generator
          </div>
        </button>
        
        <button 
          className="w-full text-left p-3 rounded-lg hover:bg-gray-200" 
          style={{ color: '#333333' }}
          onClick={onVersionHistoryClick}
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Version History
          </div>
        </button>
        
        <button 
          className="w-full text-left p-3 rounded-lg hover:bg-gray-200" 
          style={{ color: '#333333' }}
          onClick={onUserManagementClick}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </div>
        </button>
      </nav>
    </aside>
  );
};
