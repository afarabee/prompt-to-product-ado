import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { useToast } from '../../../hooks/use-toast';

interface DeveloperNotesSectionProps {
  storyGenerated: boolean;
  storyData?: {
    title: string;
    description: string;
    acceptanceCriteria: string;
  };
  notes: string;
  onNotesChange: (notes: string) => void;
  isGitHubConnected?: boolean;
}

export const DeveloperNotesSection: React.FC<DeveloperNotesSectionProps> = ({
  storyGenerated,
  storyData,
  notes,
  onNotesChange,
  isGitHubConnected = false
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const hasNotes = notes.trim().length > 0;

  const handleGenerateNotes = async () => {
    if (!storyData) {
      toast({
        title: "No story data",
        description: "Generate a story first to create developer notes.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Testing mode: simulate API call with shorter delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockNotes = generateMockNotes(storyData);
      onNotesChange(mockNotes);

      toast({
        title: hasNotes ? "Developer notes updated" : "Developer notes generated successfully",
        description: hasNotes ? "Notes have been updated with new implementation guidance." : "Notes have been generated with mock implementation guidance.",
      });
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: "Generation failed",
        description: "Could not generate notes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockNotes = (story: NonNullable<DeveloperNotesSectionProps['storyData']>) => {
    return `Suggested Code Changes:
• \`components/TaskCard.tsx\` — add new "priority" badge to UI
• \`api/updateTaskPriority.ts\` — add API logic for handling critical tasks
• \`types/Task.ts\` — update interface with new priority enum

Impact Areas:
• \`Dashboard.tsx\` — conditionally display high-priority warning
• \`tests/priorityBadge.test.ts\` — add tests for new visual indicators`;
  };

  if (!storyGenerated) {
    return null;
  }

  return (
    <div className="p-6 rounded-lg border" style={{ backgroundColor: '#F8F9FA', borderColor: '#E5E7EB' }}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold" style={{ color: '#002153' }}>
              Developer Notes
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Auto-generated notes to help devs understand where and how to implement the story. Pulled from your GitHub repo.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateNotes}
            disabled={isGenerating}
            className="flex items-center gap-2"
            aria-label={hasNotes ? "Update developer notes from GitHub" : "Generate developer notes from GitHub"}
            title={hasNotes ? "Update the implementation guidance based on your latest story edits." : "Pull insights from your GitHub repo to help developers implement this story."}
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : hasNotes ? (
              <RefreshCw className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : hasNotes ? 'Regenerate Notes from GitHub' : 'Generate Developer Notes from GitHub'}
          </Button>
        </div>

        <div className="space-y-2">
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Developer notes will be auto-generated based on your story and GitHub repository..."
            rows={12}
            className="resize-y font-mono text-sm"
            style={{ minHeight: '200px' }}
          />
          {notes && (
            <p className="text-xs text-gray-500">
              Notes will be included in the ADO work item when pushed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};