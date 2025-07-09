import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight, RotateCcw, Eye, Clock } from 'lucide-react';
import { versionHistoryService, StoryVersion } from '../../../services/VersionHistoryService';
import { DiffView } from '../chat/DiffView';
import { InlineDiffView } from '../chat/InlineDiffView';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useToast } from '../../../hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentStoryData: {
    title: string;
    description: string;
    acceptanceCriteria: string;
    storyPointEstimate: string;
  };
  onRestoreVersion: (versionData: StoryVersion['storyData']) => void;
}

export const VersionHistoryPanel: React.FC<VersionHistoryPanelProps> = ({
  isOpen,
  onClose,
  currentStoryData,
  onRestoreVersion
}) => {
  const [versions, setVersions] = useState<StoryVersion[]>([]);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [versionToRestore, setVersionToRestore] = useState<StoryVersion | null>(null);
  const [diffViewType, setDiffViewType] = useState<'inline' | 'side-by-side'>('side-by-side');
  const { toast } = useToast();

  // Load versions when panel opens
  useEffect(() => {
    if (isOpen) {
      loadVersions();
    }
  }, [isOpen]);

  const loadVersions = () => {
    const loadedVersions = versionHistoryService.getVersions();
    setVersions(loadedVersions.reverse()); // Show newest first
  };

  const handleViewChanges = (version: StoryVersion) => {
    setExpandedVersion(expandedVersion === version.id ? null : version.id);
  };

  const handleRestoreClick = (version: StoryVersion) => {
    setVersionToRestore(version);
    setRestoreDialogOpen(true);
  };

  const handleRestoreConfirm = () => {
    if (!versionToRestore) return;

    // Save current draft before restoring
    const hasContent = Object.values(currentStoryData).some(value => value.trim().length > 0);
    if (hasContent) {
      versionHistoryService.saveVersion(
        currentStoryData,
        'manual-save',
        'Draft saved before version restore'
      );
    }

    // Restore the selected version
    onRestoreVersion(versionToRestore.storyData);
    
    // Refresh versions list
    loadVersions();
    
    // Close dialogs
    setRestoreDialogOpen(false);
    setVersionToRestore(null);
    setExpandedVersion(null);

    toast({
      title: "Version restored successfully",
      description: `Restored version from ${versionHistoryService.formatTimestamp(versionToRestore.timestamp)}`,
    });
  };

  const renderDiffForField = (fieldName: string, originalContent: string, newContent: string) => {
    if (diffViewType === 'inline') {
      return (
        <InlineDiffView
          originalContent={originalContent}
          newContent={newContent}
          fieldName={fieldName}
        />
      );
    } else {
      return (
        <DiffView
          originalContent={originalContent}
          newContent={newContent}
          fieldName={fieldName}
        />
      );
    }
  };

  const renderVersionDiff = (version: StoryVersion) => {
    const fieldsToCompare = [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' },
      { key: 'acceptanceCriteria', label: 'Acceptance Criteria' },
      { key: 'storyPointEstimate', label: 'Story Points' }
    ];

    return (
      <div className="mt-4 space-y-4">
        <Tabs value={diffViewType} onValueChange={(value) => setDiffViewType(value as 'inline' | 'side-by-side')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
            <TabsTrigger value="inline">Inline</TabsTrigger>
          </TabsList>
          
          <TabsContent value={diffViewType} className="space-y-4">
            {fieldsToCompare.map(({ key, label }) => {
              const versionValue = version.storyData[key as keyof typeof version.storyData];
              const currentValue = currentStoryData[key as keyof typeof currentStoryData];
              
              if (versionValue !== currentValue) {
                return (
                  <div key={key}>
                    {renderDiffForField(label, versionValue, currentValue)}
                  </div>
                );
              }
              return null;
            })}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-60 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '480px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#005AA7' }}>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Version History</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded p-1"
            title="Close Version History"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Helper Text */}
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            Browse and restore earlier versions of this draft. A new version is saved every 30 seconds or when changes are made.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {versions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No versions saved yet</p>
              <p className="text-sm">Start editing to create your first version</p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div key={version.id} className="border rounded-lg hover:bg-gray-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium" style={{ color: '#002153' }}>
                        {versionHistoryService.formatChangeSource(version.changeSource)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {versionHistoryService.formatTimestamp(version.timestamp)}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-3">
                      {version.changeDescription}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewChanges(version)}
                        className="flex items-center gap-1"
                      >
                        {expandedVersion === version.id ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                        <Eye className="w-3 h-3" />
                        View Changes
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestoreClick(version)}
                        className="flex items-center gap-1"
                        style={{ borderColor: '#005AA7', color: '#005AA7' }}
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore Version
                      </Button>
                    </div>
                  </div>
                  
                  {expandedVersion === version.id && (
                    <div className="border-t p-4 bg-gray-50">
                      {renderVersionDiff(version)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Version</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current draft with the selected version. Your current draft will be saved before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreConfirm}>
              Restore Version
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};