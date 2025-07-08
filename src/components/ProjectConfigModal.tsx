import React, { useState, useEffect } from 'react';
import { Settings, User, Brain, Link, Upload, Download, Trash2, FileText, Image, File } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
  aiStyle: string;
  proactiveSuggestions: boolean;
  autoHighlight: boolean;
  advancedRecommendations: boolean;
  aiInteractionPreferences: string;
  adoUrl: string;
  githubUrl: string;
}

export const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { files, uploadFile, deleteFile, downloadFile, formatFileSize } = useFileUpload();
  
  const [config, setConfig] = useState<ProjectConfig>(() => {
    const saved = localStorage.getItem('project-config');
    return saved ? JSON.parse(saved) : {
      projectName: 'My Product Project',
      projectDescription: '',
      aiStyle: 'balanced',
      proactiveSuggestions: true,
      autoHighlight: true,
      advancedRecommendations: false,
      aiInteractionPreferences: '',
      adoUrl: '',
      githubUrl: '',
    };
  });

  const [activeTab, setActiveTab] = useState('context');
  const [isDragging, setIsDragging] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('project-config', JSON.stringify(config));
    setHasUnsavedChanges(false);
    toast({
      title: "Configuration saved",
      description: "Your project settings have been updated successfully.",
    });
    onClose();
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Project Configuration
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="context">Project Context</TabsTrigger>
            <TabsTrigger value="ai-behavior">AI Behavior</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="files">Supporting Files</TabsTrigger>
          </TabsList>

          <TabsContent value="context" className="space-y-6 mt-6">
            <div className="space-y-4">
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
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This context helps AI provide more relevant suggestions across all workspaces.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-behavior" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="ai-style">AI Communication Style</Label>
                <select
                  id="ai-style"
                  value={config.aiStyle}
                  onChange={(e) => updateConfig({ aiStyle: e.target.value })}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="concise">Concise - Brief, to-the-point responses</option>
                  <option value="balanced">Balanced - Moderate detail with explanations</option>
                  <option value="detailed">Detailed - Comprehensive responses with examples</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.proactiveSuggestions}
                    onChange={(e) => updateConfig({ proactiveSuggestions: e.target.checked })}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Enable proactive suggestions</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.autoHighlight}
                    onChange={(e) => updateConfig({ autoHighlight: e.target.checked })}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Auto-highlight affected fields</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.advancedRecommendations}
                    onChange={(e) => updateConfig({ advancedRecommendations: e.target.checked })}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Advanced technical recommendations</span>
                </label>
              </div>

              <div>
                <Label htmlFor="ai-preferences">AI Interaction Preferences</Label>
                <Textarea
                  id="ai-preferences"
                  value={config.aiInteractionPreferences}
                  onChange={(e) => updateConfig({ aiInteractionPreferences: e.target.value })}
                  placeholder="Describe how you prefer to interact with AI. (e.g. use simpler language, always show examples, etc.)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Customize how the AI communicates with you across all workspaces.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="ado-url">Azure DevOps Organization URL</Label>
                <Input
                  id="ado-url"
                  type="url"
                  value={config.adoUrl}
                  onChange={(e) => updateConfig({ adoUrl: e.target.value })}
                  placeholder="https://dev.azure.com/yourorg"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to ADO for enhanced backlog intelligence and story sync.
                </p>
              </div>

              <div>
                <Label htmlFor="github-url">GitHub Repository URL</Label>
                <Input
                  id="github-url"
                  type="url"
                  value={config.githubUrl}
                  onChange={(e) => updateConfig({ githubUrl: e.target.value })}
                  placeholder="https://github.com/org/repo"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Optional: Link a GitHub repo for dual-tracking or richer context.
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Integration settings will be available in the next release. 
                  Configure these now to be ready for enhanced features.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label>Upload Supporting Files</Label>
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
                    Supported: PDF, PNG, JPG, DOCX, TXT (max 10MB)
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
                  Attach screenshots, mockups, docs, or other references. These may help AI generate more tailored responses.
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
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};