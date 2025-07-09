import React, { useState, useEffect } from 'react';
import { Settings, Upload, Download, Trash2, FileText, Image, File, ChevronDown, ChevronRight, Eye, ExternalLink, Edit } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFileUpload, UploadedFile } from '@/hooks/useFileUpload';
import { useToast } from '@/hooks/use-toast';

interface ProjectConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectConfig {
  projectName: string;
  projectDescription: string;
  customInstructions: string;
  preferences: string;
  aiCommunicationStyle: string;
  enableProactiveSuggestions: boolean;
  autoHighlightChanges: boolean;
  enableAdvancedTechRecos: boolean;
  freeformAiPrefs: string;
  adoProject: string;
  githubRepo: string;
  lastUpdated: string;
}

export const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { files, uploadFile, deleteFile, downloadFile, formatFileSize } = useFileUpload();
  
  const [config, setConfig] = useState<ProjectConfig>(() => {
    const saved = localStorage.getItem('project-config');
    return saved ? JSON.parse(saved) : {
      projectName: 'My Product Project',
      projectDescription: '',
      customInstructions: '',
      preferences: '',
      aiCommunicationStyle: 'collaborative',
      enableProactiveSuggestions: true,
      autoHighlightChanges: true,
      enableAdvancedTechRecos: false,
      freeformAiPrefs: '',
      adoProject: '',
      githubRepo: '',
      lastUpdated: '',
    };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    projectContext: true,
    aiBehavior: true,
    integrations: true,
    supportingFiles: true,
    systemMetadata: true
  });

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    const updatedConfig = {
      ...config,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('project-config', JSON.stringify(updatedConfig));
    setConfig(updatedConfig);
    setHasUnsavedChanges(false);
    toast({
      title: "✅ Configuration saved successfully",
      description: "Your project settings have been updated successfully.",
    });
    // Do not close modal after save
  };

  const handleExit = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to exit?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(handleFileUpload);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(handleFileUpload);
    e.target.value = '';
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteFile(fileId);
      toast({
        title: "File deleted",
        description: "The file has been removed from your project.",
      });
    }
  };

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleExit}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Project Configuration Panel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Section 1: Project Context */}
          <Collapsible open={sectionsOpen.projectContext} onOpenChange={() => toggleSection('projectContext')}>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 hover:bg-muted rounded-md">
              {sectionsOpen.projectContext ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="text-lg font-semibold">1. Project Context</h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4 border-l-2 border-muted ml-3">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={config.projectName}
                  onChange={(e) => updateConfig({ projectName: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  value={config.projectDescription}
                  onChange={(e) => updateConfig({ projectDescription: e.target.value })}
                  placeholder="Describe your project, target users, and key goals..."
                  rows={4}
                  className="resize-y"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This context helps AI provide more relevant suggestions across all workspaces.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Section 2: AI Behavior Preferences */}
          <Collapsible open={sectionsOpen.aiBehavior} onOpenChange={() => toggleSection('aiBehavior')}>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 hover:bg-muted rounded-md">
              {sectionsOpen.aiBehavior ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="text-lg font-semibold">2. AI Behavior Preferences</h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4 border-l-2 border-muted ml-3">
              <div>
                <Label htmlFor="tone-formatting">Tone & Formatting Guidelines</Label>
                <Textarea
                  id="tone-formatting"
                  value={config.customInstructions}
                  onChange={(e) => updateConfig({ customInstructions: e.target.value })}
                  placeholder="Optional. Add style or formatting guidelines to shape how the AI writes — e.g., active voice, avoid jargon, emphasize benefits."
                  rows={3}
                  className="resize-y"
                />
              </div>
              
              <div>
                <Label htmlFor="preferences">Preferences</Label>
                <Textarea
                  id="preferences"
                  value={config.preferences}
                  onChange={(e) => updateConfig({ preferences: e.target.value })}
                  placeholder="Define default story format, estimation type, tagging conventions…"
                  rows={3}
                  className="resize-y"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Optional. These defaults help streamline AI-generated content across your team.
                </p>
              </div>

              <div>
                <Label htmlFor="ai-communication-style">AI Communication Style</Label>
                <select
                  id="ai-communication-style"
                  value={config.aiCommunicationStyle}
                  onChange={(e) => updateConfig({ aiCommunicationStyle: e.target.value })}
                  className="w-full p-2 border border-input rounded-md bg-background text-foreground z-10 relative"
                >
                  <option value="concise">Concise — Brief, to-the-point responses</option>
                  <option value="collaborative">Collaborative — Explanatory and conversational</option>
                  <option value="creative">Creative — Open-ended and idea-generating</option>
                </select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose how the AI communicates responses during generation and review.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enableProactiveSuggestions}
                      onChange={(e) => updateConfig({ enableProactiveSuggestions: e.target.checked })}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Enable Proactive Suggestions</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    Let the AI offer unsolicited ideas and improvements when generating or reviewing content.
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.autoHighlightChanges}
                      onChange={(e) => updateConfig({ autoHighlightChanges: e.target.checked })}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Auto-highlight Affected Fields</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    Highlight specific parts of the story that AI suggestions will impact.
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enableAdvancedTechRecos}
                      onChange={(e) => updateConfig({ enableAdvancedTechRecos: e.target.checked })}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Advanced Technical Recommendations</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    Allow the AI to suggest complex or domain-specific improvements when relevant.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="freeform-ai-prefs">AI Interaction Style (Free-form)</Label>
                <Textarea
                  id="freeform-ai-prefs"
                  value={config.freeformAiPrefs}
                  onChange={(e) => updateConfig({ freeformAiPrefs: e.target.value })}
                  placeholder="Optional: Describe your ideal interaction style…"
                  rows={3}
                  className="resize-y"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Customize how you want the AI to engage with you — tone, pacing, or behavior.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Section 3: Integrations */}
          <Collapsible open={sectionsOpen.integrations} onOpenChange={() => toggleSection('integrations')}>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 hover:bg-muted rounded-md">
              {sectionsOpen.integrations ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="text-lg font-semibold">3. Integrations</h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4 border-l-2 border-muted ml-3">
              <div>
                <Label htmlFor="ado-project">Azure DevOps Project</Label>
                <Input
                  id="ado-project"
                  value={config.adoProject}
                  onChange={(e) => updateConfig({ adoProject: e.target.value })}
                  placeholder="Select the active ADO project"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Select the active ADO project where stories, features, and test cases will be saved.
                </p>
              </div>

              <div>
                <Label htmlFor="github-repo">GitHub Repository</Label>
                <Input
                  id="github-repo"
                  value={config.githubRepo}
                  onChange={(e) => updateConfig({ githubRepo: e.target.value })}
                  placeholder="https://github.com/org/repo"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Connect a GitHub repo using your agent token and path. Used for context and traceability.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  These settings enable enhanced story generation and backlog intelligence.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Section 4: Supporting Files */}
          <Collapsible open={sectionsOpen.supportingFiles} onOpenChange={() => toggleSection('supportingFiles')}>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 hover:bg-muted rounded-md">
              {sectionsOpen.supportingFiles ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="text-lg font-semibold">4. Supporting Files (Custom Knowledgebase)</h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4 border-l-2 border-muted ml-3">
              <div>
                <Label>Upload Project Files</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Accepted file types: PDF, DOCX, TXT, PNG. Max size: 10MB per file.
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    accept=".pdf,.png,.jpg,.jpeg,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Upload documentation, style guides, or reference materials to help the AI generate accurate, domain-specific responses. Examples include personas, workflows, technical specifications, story point rubrics, README files, and user research summaries.
                </p>
              </div>

              {files.length > 0 && (
                <div>
                  <Label>Uploaded Files ({files.length})</Label>
                  <div className="space-y-2 mt-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-card"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadFile(file)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadFile(file)}
                            title="Open"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {/* TODO: Implement rename */}}
                            title="Rename"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Section 5: System Metadata */}
          <Collapsible open={sectionsOpen.systemMetadata} onOpenChange={() => toggleSection('systemMetadata')}>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 hover:bg-muted rounded-md">
              {sectionsOpen.systemMetadata ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="text-lg font-semibold">5. System Metadata</h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4 border-l-2 border-muted ml-3">
              <div>
                <Label htmlFor="last-updated">Last Updated</Label>
                <Input
                  id="last-updated"
                  value={config.lastUpdated ? new Date(config.lastUpdated).toLocaleString() : 'Never'}
                  readOnly
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Shows the last time this configuration was modified and saved.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleExit}>
            Exit
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasUnsavedChanges}
            title="Save all configuration changes across this panel."
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};