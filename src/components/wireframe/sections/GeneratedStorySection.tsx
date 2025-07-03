
import React from 'react';
import { StoryField } from '../fields/StoryField';
import { ADOIntegrationSection } from './ADOIntegrationSection';
import { Copy } from 'lucide-react';

interface GeneratedStorySectionProps {
  previewMode?: boolean;
}

export const GeneratedStorySection: React.FC<GeneratedStorySectionProps> = ({ previewMode = false }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border-2 relative" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
          <button 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100" 
            style={{ color: '#005AA7' }}
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm font-medium">Copy</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <StoryField
            label="Title"
            fieldName="title"
            value={previewMode ? "" : "Enhanced User Management System"}
            placeholder="What's the story about? Keep it short and descriptive."
            inputType="text"
            helperText="Brief, descriptive summary of the user story"
            previewMode={previewMode}
          />
          
          <StoryField
            label="Description"
            fieldName="description"
            value={previewMode ? "" : "As a product owner, I want comprehensive user management functionality, including role assignments, permission controls, and mobile responsive interface so that I can efficiently manage team access across all devices."}
            placeholder="As a [user], I want [action] so that [benefit]..."
            inputType="textarea"
            rows={8}
            helperText="Describe the user goal or functionality in clear, outcome-focused terms."
            previewMode={previewMode}
          />
          
          <StoryField
            label="Acceptance Criteria"
            fieldName="acceptanceCriteria"
            value={previewMode ? "" : "• User can assign and modify roles for team members\n• System displays confirmation when permissions are updated\n• Interface adapts to mobile devices with touch-friendly controls\n• Admin can export user access reports in CSV format\n• All user management actions are logged for audit purposes"}
            placeholder="List clear, testable conditions that must be true before this story is 'done.'\n• User can do X with Y\n• The system shows an error when...\n• Feature must support A, B, and C"
            inputType="textarea"
            rows={8}
            helperText="Clear, testable conditions that define when the story is complete"
            previewMode={previewMode}
          />
          
          <div className="mt-6">
            <button className="w-full p-3 rounded-lg font-medium" style={{ backgroundColor: '#E8F4FD', color: '#005AA7', border: '1px solid #005AA7' }}>
              Save Draft
            </button>
          </div>
        </div>

      </div>
      
      <ADOIntegrationSection previewMode={previewMode} />
    </div>
  );
};
