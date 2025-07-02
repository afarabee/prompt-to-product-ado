
import React from 'react';
import { StoryField } from '../fields/StoryField';

export const GeneratedStorySection = () => {
  return (
    <div className="p-6 rounded-lg border-2 relative" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
      </div>
      
      <div className="space-y-4">
        <StoryField
          label="Title"
          fieldName="title"
          value="As a product owner, I want enhanced user management so that users can securely manage access."
          hasChanges={true}
          changeCount={3}
        />
        
        <StoryField
          label="Description"
          fieldName="description"
          value="Detailed story description following INVEST criteria..."
          hasChanges={false}
        />
        
        <StoryField
          label="Acceptance Criteria"
          fieldName="acceptanceCriteria"
          value="• Given [condition], when [action], then [result]
• Verify [specific behavior]
• Ensure [quality criteria]"
          hasChanges={false}
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
  );
};
