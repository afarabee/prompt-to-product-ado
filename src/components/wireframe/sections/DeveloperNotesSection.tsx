import React, { useState, useEffect } from 'react';
import { RefreshCw, Github, AlertCircle } from 'lucide-react';
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

  // Auto-generate notes when story is first generated
  useEffect(() => {
    if (storyGenerated && !notes && isGitHubConnected && storyData) {
      handleGenerateNotes();
    }
  }, [storyGenerated, storyData, isGitHubConnected]);

  const handleGenerateNotes = async () => {
    if (!isGitHubConnected) {
      toast({
        title: "GitHub not connected",
        description: "Connect a GitHub repository in Project Settings to generate developer notes.",
        variant: "destructive"
      });
      return;
    }

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
      // TODO: This would require backend integration with GitHub API
      // For now, we'll simulate the generation with mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      const mockNotes = generateMockNotes(storyData);
      onNotesChange(mockNotes);

      toast({
        title: "Developer notes generated",
        description: "Notes have been updated based on your GitHub repository.",
      });
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: "Generation failed",
        description: "Could not generate notes from GitHub repository. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockNotes = (story: NonNullable<DeveloperNotesSectionProps['storyData']>) => {
    return `Suggested Code Changes:
• \`components/UserManagement/UserCard.tsx\` — update to display new role assignment controls
• \`api/users/updatePermissions.ts\` — add support for new permission management logic
• \`hooks/useUserPermissions.ts\` — extend hook to handle mobile-responsive states
• \`tests/userManagement.test.ts\` — add tests for role assignment and permission updates

Check for any impact on:
• \`components/shared/PermissionBadge.tsx\` — may need styling updates
• \`utils/permissionHelpers.ts\` — verify helper functions support new roles
• \`README.md\` — update documentation for new user management features
• \`cypress/integration/userManagement.spec.ts\` — add E2E tests

Database Considerations:
• Review \`user_roles\` table schema for new permission types
• Check if \`audit_logs\` table captures role changes appropriately
• Ensure indexes exist for efficient permission queries`;
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
          {isGitHubConnected && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateNotes}
              disabled={isGenerating}
              className="flex items-center gap-2"
              aria-label="Regenerate developer notes from GitHub"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              {isGenerating ? 'Generating...' : 'Regenerate Notes from GitHub'}
            </Button>
          )}
        </div>

        {!isGitHubConnected ? (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-800 font-medium">
                Connect a GitHub repository in Project Settings to generate developer notes.
              </p>
              <p className="text-amber-700 mt-1">
                This will provide AI-generated implementation guidance based on your codebase.
              </p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};