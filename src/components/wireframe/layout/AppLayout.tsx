
import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { RawInputSection } from '../sections/RawInputSection';
import { GeneratedStorySection } from '../sections/GeneratedStorySection';
import { ChatDrawer } from '../chat/ChatDrawer';
import { VersionHistorySidebar } from '../sidebars/VersionHistorySidebar';
import { UserManagementModal } from '../modals/UserManagementModal';

export const AppLayout = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <AppHeader />
      
      <div className="flex items-center gap-4 p-4 border-b">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`px-4 py-2 rounded-lg font-medium ${
            previewMode 
              ? 'bg-blue-100 text-blue-800 border border-blue-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}
        >
          {previewMode ? 'Preview Mode: ON' : 'Preview Mode: OFF'}
        </button>
        <span className="text-sm text-gray-600">
          {previewMode ? 'Normal mode with sample data' : 'Testing layout without sample data'}
        </span>
      </div>
      
      <div className="flex h-screen">
        <AppSidebar 
          onVersionHistoryClick={() => setShowVersionHistory(true)}
          onUserManagementClick={() => setShowUserManagement(true)}
          onAIChatClick={() => setShowAIChat(true)}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className={`grid gap-6 ${isInputCollapsed ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
              <RawInputSection 
                isCollapsed={isInputCollapsed}
                onToggleCollapse={setIsInputCollapsed}
                previewMode={previewMode}
              />
              <GeneratedStorySection previewMode={previewMode} />
            </div>
          </div>
        </main>
      </div>
      
      <ChatDrawer 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
      
      <VersionHistorySidebar 
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
      />
      
      <UserManagementModal
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
      />
    </div>
  );
};
