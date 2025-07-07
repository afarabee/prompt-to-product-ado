
import React from 'react';
import { StoryField } from '../fields/StoryField';
import { ADOIntegrationSection } from './ADOIntegrationSection';
import { Copy, RotateCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GeneratedStorySectionProps {
  previewMode?: boolean;
  storyGenerated?: boolean;
  title: string;
  description: string;
  acceptanceCriteria: string;
  storyPointEstimate: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAcceptanceCriteriaChange: (value: string) => void;
  onStoryPointEstimateChange: (value: string) => void;
  onStartOver?: () => void;
}

export const GeneratedStorySection: React.FC<GeneratedStorySectionProps> = ({ 
  previewMode = false, 
  storyGenerated = false,
  title,
  description,
  acceptanceCriteria,
  storyPointEstimate,
  onTitleChange,
  onDescriptionChange,
  onAcceptanceCriteriaChange,
  onStoryPointEstimateChange,
  onStartOver
}) => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="p-6 rounded-lg border-2 relative" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
            <div className="flex items-center gap-2">
              {storyGenerated && onStartOver && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={onStartOver}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100" 
                      style={{ color: '#005AA7' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm font-medium">Start Over</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear everything and begin a new story</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <button 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100" 
                style={{ color: '#005AA7' }}
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">Copy</span>
              </button>
            </div>
          </div>
        
        <div className="space-y-4">
          <StoryField
            label="Title"
            fieldName="title"
            value={title}
            placeholder="What's the story about? Keep it short and descriptive."
            inputType="text"
            helperText="Brief, descriptive summary of the user story"
            onChange={onTitleChange}
          />
          
          <StoryField
            label="Description"
            fieldName="description"
            value={description}
            placeholder="As a [user], I want [action] so that [benefit]..."
            inputType="textarea"
            rows={8}
            helperText="Describe the user goal or functionality in clear, outcome-focused terms."
            onChange={onDescriptionChange}
          />
          
          <StoryField
            label="Acceptance Criteria"
            fieldName="acceptanceCriteria"
            value={acceptanceCriteria}
            placeholder="List clear, testable success criteria (e.g., User can do X, system shows error when, feature must support A, B, and C)"
            inputType="textarea"
            rows={8}
            helperText="Conditions that must be true for this story to be complete."
            onChange={onAcceptanceCriteriaChange}
          />
          
          <div className="mt-6">
            <button className="w-full p-3 rounded-lg font-medium" style={{ backgroundColor: '#E8F4FD', color: '#005AA7', border: '1px solid #005AA7' }}>
              Save Draft
            </button>
          </div>
        </div>

        </div>
        
        <ADOIntegrationSection 
          previewMode={previewMode} 
          storyGenerated={storyGenerated}
          storyPointEstimate={storyPointEstimate}
          onStoryPointEstimateChange={onStoryPointEstimateChange}
        />
      </div>
    </TooltipProvider>
  );
};
