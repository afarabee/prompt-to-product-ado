
import React from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { RawInputSection } from '../sections/RawInputSection';
import { GeneratedStorySection } from '../sections/GeneratedStorySection';
import { ADOIntegrationSection } from '../sections/ADOIntegrationSection';
import { AnalyticsSection } from '../sections/AnalyticsSection';
import { ChatDrawer } from '../chat/ChatDrawer';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <AppHeader />
      
      <div className="flex h-screen">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <RawInputSection />
              <GeneratedStorySection />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <ADOIntegrationSection />
              <AnalyticsSection />
            </div>
          </div>
        </main>
      </div>
      
      <ChatDrawer />
    </div>
  );
};
