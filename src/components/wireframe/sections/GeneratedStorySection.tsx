
import React from 'react';
import { StoryField } from '../fields/StoryField';
import { ADOIntegrationSection } from './ADOIntegrationSection';

export const GeneratedStorySection = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border-2 relative" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
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
            value=""
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

        <div className="flex gap-3 mt-6">
          <button className="flex-1 p-3 rounded-lg font-medium text-white" style={{ backgroundColor: '#005AA7' }}>
            Copy Full Story
          </button>
          <button className="flex-1 p-3 rounded-lg font-medium text-white" style={{ backgroundColor: '#005AA7' }}>
            Send to ADO
          </button>
        </div>
      </div>
      
      <ADOIntegrationSection />
    </div>
  );
};
