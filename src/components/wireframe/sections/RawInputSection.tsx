
import React, { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface RawInputSectionProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  previewMode?: boolean;
  onGenerateStory?: () => void;
  onStartOver?: () => void;
  storyInput: string;
  customPrompt: string;
  onStoryInputChange: (value: string) => void;
  onCustomPromptChange: (value: string) => void;
}

export const RawInputSection: React.FC<RawInputSectionProps> = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  previewMode = false,
  onGenerateStory,
  onStartOver,
  storyInput,
  customPrompt,
  onStoryInputChange,
  onCustomPromptChange
}) => {
  const [startOver, setStartOver] = useState(false);

  const handleStartOver = () => {
    // Clear any stored data from local storage
    localStorage.removeItem('storyBuilderData');
    
    setStartOver(true);
    setTimeout(() => setStartOver(false), 100);
    
    // Call parent handler to reset story generation state
    onStartOver?.();
  };

  const handleStoryInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onStoryInputChange(e.target.value);
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCustomPromptChange(e.target.value);
  };

  const handleGenerateClick = () => {
    // Button is functional in both modes now
    onGenerateStory?.();
  };

  const handleToggleCollapse = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="p-4 rounded-lg border-2 bg-gray-50" style={{ borderColor: '#808384' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Raw Input Section</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleToggleCollapse}
                className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
                style={{ color: '#005AA7' }}
              >
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">Expand</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit your input or start a new story</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Raw Input Section</h2>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
                style={{ color: '#005AA7' }}
                title="Start Over"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Start Over</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to start over?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear all fields and erase any stored data from this session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleStartOver}>Proceed</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <button
            onClick={handleToggleCollapse}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
            style={{ color: '#005AA7' }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Collapse</span>
          </button>
        </div>
      </div>
      
      <TooltipProvider>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium" style={{ color: '#333333' }}>
                Story Input
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe your feature request in plain language. Don't worry about format - AI will structure it.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <textarea 
              className="w-full min-h-32 p-3 border rounded-lg resize-y" 
              style={{ backgroundColor: '#FFFFFF', borderColor: '#808384', fontSize: '14px' }}
              placeholder="Describe the feature, idea, or problem in plain language. Don't worry about the format--AI will handle that."
              value={storyInput}
              rows={6}
              onChange={handleStoryInputChange}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium" style={{ color: '#333333' }}>
                Custom Prompt
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Provide specific instructions to guide AI generation. This builds on the story input above.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <textarea 
              className="w-full min-h-40 p-3 border rounded-lg resize-y" 
              style={{ backgroundColor: '#FFFFFF', borderColor: '#808384', fontSize: '14px' }}
              placeholder="Write a custom prompt to guide the AI. This builds on any raw input or backend product context provided."
              value={customPrompt}
              rows={8}
              onChange={handleCustomPromptChange}
            />
            <div className="text-xs text-gray-500 mt-1 break-words">
              Optional. Use this if you want to steer the AI beyond the default behavior.
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
              Upload Supporting Files
            </label>
            <input 
              type="file" 
              multiple
              className="w-full p-2 border rounded" 
              style={{ borderColor: '#808384' }}
              key={startOver ? 'reset-files' : 'normal-files'}
            />
            <div className="text-xs text-gray-500 mt-1 break-words">
              Optional. Upload screenshots, mockups, docs, or other references. Accepted formats: PDF, PNG, DOCX, TXT. Max 10MB.
            </div>
          </div>
          
          <button 
            onClick={handleGenerateClick}
            className="w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:opacity-90" 
            style={{ backgroundColor: '#005AA7' }}
          >
            <RefreshCw className="w-4 h-4" />
            Generate User Story
          </button>
        </div>
      </TooltipProvider>
    </div>
  );
};
