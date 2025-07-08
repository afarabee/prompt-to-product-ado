
import React, { useState, useEffect } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { RawInputSection } from '../sections/RawInputSection';
import { GeneratedStorySection } from '../sections/GeneratedStorySection';
import { ChatDrawer } from '../chat/ChatDrawer';
import { GeneralChatDrawer } from '../chat/GeneralChatDrawer';
import { VersionHistorySidebar } from '../sidebars/VersionHistorySidebar';
import { UserManagementModal } from '../modals/UserManagementModal';
import { ProjectConfigDrawer } from '../../ProjectConfigDrawer';

import { StoryReviewPanel } from '../panels/StoryReviewPanel';

export const AppLayout = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showGeneralAIChat, setShowGeneralAIChat] = useState(false);
  const [showProjectConfig, setShowProjectConfig] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [showStoryReviewPanel, setShowStoryReviewPanel] = useState(false);
  const [isStoryReviewMinimized, setIsStoryReviewMinimized] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<Array<{
    fieldName: string;
    previousValue: string;
    newValue: string;
    timestamp: number;
    actionType: string;
  }>>([]);
  const [recentConfirmation, setRecentConfirmation] = useState<{
    fieldName: string;
    message: string;
    showUndo: boolean;
  } | null>(null);

  // Field values state
  const [fieldValues, setFieldValues] = useState({
    storyInput: '',
    customPrompt: '',
    title: '',
    description: '',
    acceptanceCriteria: '',
    storyPointEstimate: ''
  });


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
        
        
        return { ...prev, [fieldName]: newValue };
      });
    };

    const handleReplaceStoryFromAI = (event: CustomEvent) => {
      const { content } = event.detail;
      
      // Store previous values for version history
      const previousStory = {
        title: fieldValues.title,
        description: fieldValues.description,
        acceptanceCriteria: fieldValues.acceptanceCriteria,
        storyPointEstimate: fieldValues.storyPointEstimate
      };
      
      // Parse the AI story content and extract fields (handle both with and without asterisks)
      const parseStoryContent = (content: string) => {
        const titleMatch = content.match(/(?:\*\*)?Title:?\*?\*?\s*(.+?)(?=\n|Description:|Acceptance|Story Point|\*\*|$)/);
        const descriptionMatch = content.match(/(?:\*\*)?Description:?\*?\*?\s*([\s\S]*?)(?=\n(?:\*\*)?Acceptance|Story Point|\*\*|$)/);
        const criteriaMatch = content.match(/(?:\*\*)?Acceptance Criteria:?\*?\*?\s*([\s\S]*?)(?=\n(?:\*\*)?Story Point|\*\*|$)/);
        const estimateMatch = content.match(/(?:\*\*)?Story Point Estimate:?\*?\*?\s*(.+?)(?=\n|\*\*|$)/);
        
        return {
          title: titleMatch?.[1]?.trim() || '',
          description: descriptionMatch?.[1]?.trim() || '',
          acceptanceCriteria: criteriaMatch?.[1]?.trim() || '',
          storyPointEstimate: estimateMatch?.[1]?.trim() || ''
        };
      };
      
      const parsedStory = parseStoryContent(content);
      
      // Update field values
      setFieldValues(prev => ({
        ...prev,
        title: parsedStory.title,
        description: parsedStory.description,
        acceptanceCriteria: parsedStory.acceptanceCriteria,
        storyPointEstimate: parsedStory.storyPointEstimate
      }));
      
      // Save to version history
      const versionEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        label: 'Story updated via AI Chat (full story edit)',
        previousValues: previousStory,
        newValues: parsedStory,
        changeType: 'ai-story-replacement'
      };
      
      // Trigger version history save event
      const versionEvent = new CustomEvent('saveToVersionHistory', { 
        detail: versionEntry 
      });
      window.dispatchEvent(versionEvent);
    };

    const handleGetFieldValue = (event: CustomEvent) => {
      const { fieldName } = event.detail;
      // This could be used to send current field values back to ChatDrawer
      console.log('Field value requested for:', fieldName, fieldValues[fieldName as keyof typeof fieldValues]);
    };

    const handleHighlightField = (event: CustomEvent) => {
      const { fieldName } = event.detail;
      setHighlightedField(fieldName);
      
      // Clear highlight after 3 seconds if no action taken
      setTimeout(() => {
        setHighlightedField(null);
      }, 3000);
    };

    const handleShowConfirmation = (event: CustomEvent) => {
      const { fieldName, previousValue, newValue } = event.detail;
      
      // Add to undo stack
      setUndoStack(prev => [...prev.slice(-4), {
        fieldName,
        previousValue,
        newValue,
        timestamp: Date.now(),
        actionType: 'ai-suggestion'
      }]);

      // Show confirmation
      setRecentConfirmation({
        fieldName,
        message: `Changes successfully applied to ${fieldName}`,
        showUndo: true
      });

      // Clear highlight
      setHighlightedField(null);

      // Auto-hide confirmation after 10 seconds
      setTimeout(() => {
        setRecentConfirmation(null);
      }, 10000);
    };

    const handleUndo = (event: CustomEvent) => {
      const { fieldName } = event.detail;
      const lastChange = undoStack.filter(change => change.fieldName === fieldName).pop();
      
      if (lastChange) {
        // Restore previous value
        setFieldValues(prev => ({
          ...prev,
          [fieldName]: lastChange.previousValue
        }));

        // Remove from undo stack
        setUndoStack(prev => prev.filter(change => change !== lastChange));

        // Clear confirmation
        setRecentConfirmation(null);

        // Briefly highlight the field
        setHighlightedField(fieldName);
        setTimeout(() => {
          setHighlightedField(null);
        }, 1500);
      }
    };

    window.addEventListener('updateFieldFromAI', handleUpdateFieldFromAI as EventListener);
    window.addEventListener('replaceStoryFromAI', handleReplaceStoryFromAI as EventListener);
    window.addEventListener('getFieldValue', handleGetFieldValue as EventListener);
    window.addEventListener('highlightField', handleHighlightField as EventListener);
    window.addEventListener('showConfirmation', handleShowConfirmation as EventListener);
    window.addEventListener('triggerUndo', handleUndo as EventListener);
    
    return () => {
      window.removeEventListener('updateFieldFromAI', handleUpdateFieldFromAI as EventListener);
      window.removeEventListener('replaceStoryFromAI', handleReplaceStoryFromAI as EventListener);
      window.removeEventListener('getFieldValue', handleGetFieldValue as EventListener);
      window.removeEventListener('highlightField', handleHighlightField as EventListener);
      window.removeEventListener('showConfirmation', handleShowConfirmation as EventListener);
      window.removeEventListener('triggerUndo', handleUndo as EventListener);
    };
  }, [fieldValues]);


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
    setHighlightedField(null);
    setUndoStack([]);
    setRecentConfirmation(null);
  };

  const handleFieldChange = (fieldName: keyof typeof fieldValues, value: string) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleGenerateStory = () => {
    // Generate sample data in both Preview Mode ON and OFF
    setFieldValues(prev => ({
      ...prev,
      title: "Enhanced User Management System",
      description: "As a product owner, I want comprehensive user management functionality, including role assignments, permission controls, and mobile responsive interface so that I can efficiently manage team access across all devices.",
      acceptanceCriteria: "• User can assign and modify roles for team members\n• System displays confirmation when permissions are updated\n• Interface adapts to mobile devices with touch-friendly controls\n• Admin can export user access reports in CSV format\n• All user management actions are logged for audit purposes",
      storyPointEstimate: "5"
    }));
    setStoryGenerated(true);
    
    // Auto-collapse input and show Story Review Panel
    setIsInputCollapsed(true);
    setShowStoryReviewPanel(true);
    setIsStoryReviewMinimized(false);
  };

  const handleStartOver = () => {
    clearAllFields();
    // Reset layout to 2-column and close panels
    setIsInputCollapsed(false);
    setShowStoryReviewPanel(false);
    setIsStoryReviewMinimized(false);
    
    // Clear story review chat history
    const startOverEvent = new CustomEvent('startOverStoryChat');
    window.dispatchEvent(startOverEvent);
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
          onAIChatClick={() => {
            setShowGeneralAIChat(true);
            setShowAIChat(false); // Close story chat if open
          }}
          onProjectConfigClick={() => setShowProjectConfig(true)}
          showStoryReviewChat={showStoryReviewPanel}
        />
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ${showStoryReviewPanel && !isStoryReviewMinimized ? 'lg:mr-96' : showStoryReviewPanel && isStoryReviewMinimized ? 'lg:mr-12' : ''}`}>
          <div className="p-6">
            <div className={`grid gap-6 transition-all duration-300 ${
              showStoryReviewPanel ? 
                (isInputCollapsed ? 'grid-cols-1' : 'lg:grid-cols-2') : 
                (isInputCollapsed ? 'grid-cols-1' : 'lg:grid-cols-2')
            }`}>
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
                onStartOver={handleStartOver}
              />
            </div>
          </div>
        </main>
      </div>
      
      <ChatDrawer 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
      
      <GeneralChatDrawer 
        isOpen={showGeneralAIChat}
        onClose={() => setShowGeneralAIChat(false)}
      />
      
      <VersionHistorySidebar 
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
      />
      
      <UserManagementModal
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
      />
      
      <ProjectConfigDrawer
        isOpen={showProjectConfig}
        onClose={() => setShowProjectConfig(false)}
      />
      
      <StoryReviewPanel
        isOpen={showStoryReviewPanel}
        isMinimized={isStoryReviewMinimized}
        onClose={() => setShowStoryReviewPanel(false)}
        onMinimize={() => setIsStoryReviewMinimized(true)}
        onMaximize={() => setIsStoryReviewMinimized(false)}
        story={storyGenerated ? {
          title: fieldValues.title,
          description: fieldValues.description,
          acceptanceCriteria: fieldValues.acceptanceCriteria,
          storyPointEstimate: fieldValues.storyPointEstimate
        } : undefined}
      />
    </div>
  );
};
