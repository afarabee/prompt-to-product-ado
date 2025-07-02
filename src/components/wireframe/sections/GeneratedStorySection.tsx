
import React from 'react';
import { StoryField } from '../fields/StoryField';
import { AcceptRejectPanel } from '../fields/AcceptRejectPanel';
import { CrossFieldNotification } from '../fields/CrossFieldNotification';

export const GeneratedStorySection = () => {
  return (
    <div className="space-y-4">
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
          
          <CrossFieldNotification
            message="Description changed. Regenerate Acceptance Criteria?"
            onAccept={() => console.log('Regenerating AC')}
            onDismiss={() => console.log('Dismissed')}
          />
          
          <StoryField
            label="Acceptance Criteria"
            fieldName="acceptanceCriteria"
            value="• Given [condition], when [action], then [result]\n• Verify [specific behavior]\n• Ensure [quality criteria]"
            hasChanges={false}
            needsUpdate={true}
          />
        </div>

        <AcceptRejectPanel />
      </div>

      <div className="p-4 rounded border" style={{ backgroundColor: '#00A0E3', borderColor: '#005AA7' }}>
        <h3 className="text-sm font-semibold text-white mb-2">INVEST Criteria Validation</h3>
        <div className="grid grid-cols-3 gap-2 text-xs text-white">
          <div>✓ Independent</div>
          <div>✓ Negotiable</div>
          <div>✓ Valuable</div>
          <div>✓ Estimable</div>
          <div>✓ Small</div>
          <div>✓ Testable</div>
        </div>
      </div>
    </div>
  );
};
