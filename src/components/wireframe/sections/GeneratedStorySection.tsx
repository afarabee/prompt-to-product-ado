
import React from 'react';
import { StoryField } from '../fields/StoryField';
import { ADOIntegrationSection } from './ADOIntegrationSection';
import { Copy } from 'lucide-react';

export const GeneratedStorySection = () => {
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
            value=""
            placeholder="What's the story about? Keep it short and descriptive."
            inputType="text"
          />
          
          <StoryField
            label="Description"
            fieldName="description"
            value={`As a product owner, I want enhanced user management so that users can securely manage access.

Current: Basic functionality with limited options
Suggested: As a product owner, I want comprehensive user management functionality, including role assignments, permission controls, and mobile responsive interface so that I can efficiently manage team access across all devices.`}
            placeholder="As a product owner, I want enhanced user management so that users can securely manage access."
            inputType="textarea"
            rows={6}
          />
          
          <StoryField
            label="Acceptance Criteria"
            fieldName="acceptanceCriteria"
            value=""
            placeholder="List clear, testable conditions that must be true before this story is 'done.'&#10;• User can do X with Y&#10;• The system shows an error when...&#10;• Feature must support A, B, and C"
            inputType="textarea"
            rows={8}
          />
        </div>

        <div className="mt-6">
          <button className="w-full p-3 rounded-lg font-medium" style={{ backgroundColor: '#E8F4FD', color: '#005AA7', border: '1px solid #005AA7' }}>
            Save Draft
          </button>
        </div>
      </div>
      
      <ADOIntegrationSection />
    </div>
  );
};
