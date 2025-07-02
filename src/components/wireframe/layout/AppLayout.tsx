
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

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <AppHeader />
      
      <div className="flex h-screen">
        <AppSidebar 
          onVersionHistoryClick={() => setShowVersionHistory(true)}
          onUserManagementClick={() => setShowUserManagement(true)}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className={`grid gap-6 ${isInputCollapsed ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
              <RawInputSection 
                isCollapsed={isInputCollapsed}
                onToggleCollapse={setIsInputCollapsed}
              />
              <GeneratedStorySection />
            </div>
          </div>
        </main>
      </div>
      
      <ChatDrawer />
      
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
