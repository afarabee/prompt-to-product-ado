
import React, { useState, useEffect } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { RawInputSection } from '../sections/RawInputSection';
import { GeneratedStorySection } from '../sections/GeneratedStorySection';
import { ChatDrawer } from '../chat/ChatDrawer';
import { VersionHistorySidebar } from '../sidebars/VersionHistorySidebar';
import { UserManagementModal } from '../modals/UserManagementModal';
import { DependencyNotification } from '../fields/DependencyNotification';

export const AppLayout = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);

  // Field values state
  const [fieldValues, setFieldValues] = useState({
    storyInput: '',
    customPrompt: '',
    title: '',
    description: '',
    acceptanceCriteria: '',
    storyPointEstimate: ''
  });

  // Dependency tracking state
  const [dependencies, setDependencies] = useState<{
    sourceField: string;
    targetField: string;
    show: boolean;
  } | null>(null);

  // Clear all fields when preview mode toggles
  useEffect(() => {
    clearAllFields();
  }, [previewMode]);

  // Handle AI field updates
  useEffect(() => {
    const handleUpdateFieldFromAI = (event: CustomEvent) => {
      const { fieldName, action, suggestedContent } = event.detail;
      
      setFieldValues(prev => {
        const currentValue = prev[fieldName as keyof typeof prev];
        let newValue = '';
        
        switch (action) {
          case 'replace':
            newValue = suggestedContent;
            break;
          case 'append':
            newValue = currentValue ? `${currentValue}\n\n${suggestedContent}` : suggestedContent;
            break;
          case 'edit':
            newValue = suggestedContent; // Already edited content passed from ChatMessage
            break;
          default:
            return prev;
        }
        
        // Trigger dependency notification for Description and Acceptance Criteria
        if ((fieldName === 'description' || fieldName === 'acceptanceCriteria') && 
            currentValue !== newValue) {
          
          const sourceField = fieldName === 'description' ? 'Description' : 'Acceptance Criteria';
          const targetField = fieldName === 'description' ? 'Acceptance Criteria' : 'Description';
          const targetFieldValue = fieldName === 'description' ? prev.acceptanceCriteria : prev.description;
          
          // Only show notification if target field has content
          if (targetFieldValue) {
            setTimeout(() => {
              setDependencies({
                sourceField,
                targetField,
                show: true
              });
            }, 500);
          }
        }
        
        return { ...prev, [fieldName]: newValue };
      });
    };

    const handleGetFieldValue = (event: CustomEvent) => {
      const { fieldName } = event.detail;
      // This could be used to send current field values back to ChatDrawer
      console.log('Field value requested for:', fieldName, fieldValues[fieldName as keyof typeof fieldValues]);
    };

    window.addEventListener('updateFieldFromAI', handleUpdateFieldFromAI as EventListener);
    window.addEventListener('getFieldValue', handleGetFieldValue as EventListener);
    
    return () => {
      window.removeEventListener('updateFieldFromAI', handleUpdateFieldFromAI as EventListener);
      window.removeEventListener('getFieldValue', handleGetFieldValue as EventListener);
    };
  }, [fieldValues]);

  const handleDependencyClick = () => {
    if (dependencies) {
      const targetFieldName = dependencies.targetField === 'Description' ? 'description' : 'acceptanceCriteria';
      const event = new CustomEvent('openFieldChat', { 
        detail: { 
          fieldName: targetFieldName, 
          label: dependencies.targetField 
        } 
      });
      window.dispatchEvent(event);
      setDependencies(null);
    }
  };

  const handleDependencyDismiss = () => {
    setDependencies(null);
  };

  const clearAllFields = () => {
    setFieldValues({
      storyInput: '',
      customPrompt: '',
      title: '',
      description: '',
      acceptanceCriteria: '',
      storyPointEstimate: ''
    });
    setStoryGenerated(false);
  };

  const handleFieldChange = (fieldName: keyof typeof fieldValues, value: string) => {
    const previousValue = fieldValues[fieldName];
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Check for field dependencies
    if (fieldName === 'description' && previousValue !== value && fieldValues.acceptanceCriteria) {
      setDependencies({
        sourceField: 'Description',
        targetField: 'Acceptance Criteria',
        show: true
      });
    } else if (fieldName === 'acceptanceCriteria' && previousValue !== value && fieldValues.description) {
      setDependencies({
        sourceField: 'Acceptance Criteria',
        targetField: 'Description',
        show: true
      });
    }
  };

  const handleGenerateStory = () => {
    if (previewMode) {
      // Generate sample data only in Preview Mode ON
      setFieldValues(prev => ({
        ...prev,
        title: "Enhanced User Management System",
        description: "As a product owner, I want comprehensive user management functionality, including role assignments, permission controls, and mobile responsive interface so that I can efficiently manage team access across all devices.",
        acceptanceCriteria: "• User can assign and modify roles for team members\n• System displays confirmation when permissions are updated\n• Interface adapts to mobile devices with touch-friendly controls\n• Admin can export user access reports in CSV format\n• All user management actions are logged for audit purposes",
        storyPointEstimate: "5"
      }));
      setStoryGenerated(true);
    }
    // In Preview Mode OFF, button is functional but doesn't populate fields
  };

  const handleStartOver = () => {
    clearAllFields();
  };

  const handlePreviewModeToggle = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <AppHeader />
      
      <div className="flex items-center gap-4 p-4 border-b">
        <button
          onClick={handlePreviewModeToggle}
          className={`px-4 py-2 rounded-lg font-medium ${
            previewMode 
              ? 'bg-blue-100 text-blue-800 border border-blue-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}
        >
          {previewMode ? 'Preview Mode: ON' : 'Preview Mode: OFF'}
        </button>
        <span className="text-sm text-gray-600">
          {previewMode ? 'Simulated User Interaction Mode' : 'Empty State Testing Mode'}
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
                onGenerateStory={handleGenerateStory}
                onStartOver={handleStartOver}
                storyInput={fieldValues.storyInput}
                customPrompt={fieldValues.customPrompt}
                onStoryInputChange={(value) => handleFieldChange('storyInput', value)}
                onCustomPromptChange={(value) => handleFieldChange('customPrompt', value)}
              />
              <GeneratedStorySection 
                previewMode={previewMode} 
                storyGenerated={storyGenerated}
                title={fieldValues.title}
                description={fieldValues.description}
                acceptanceCriteria={fieldValues.acceptanceCriteria}
                storyPointEstimate={fieldValues.storyPointEstimate}
                onTitleChange={(value) => handleFieldChange('title', value)}
                onDescriptionChange={(value) => handleFieldChange('description', value)}
                onAcceptanceCriteriaChange={(value) => handleFieldChange('acceptanceCriteria', value)}
                onStoryPointEstimateChange={(value) => handleFieldChange('storyPointEstimate', value)}
              />
              {dependencies?.show && (
                <DependencyNotification
                  sourceField={dependencies.sourceField}
                  targetField={dependencies.targetField}
                  onClickField={handleDependencyClick}
                  onDismiss={handleDependencyDismiss}
                />
              )}
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
