
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Target, RefreshCw, Undo2 } from 'lucide-react';
import { UserStory } from '../pages/Index';

interface GeneratedStoryProps {
  story: UserStory;
  onRegenerateField: (fieldName: keyof UserStory, currentValue: string | string[]) => Promise<void>;
}

export const GeneratedStory: React.FC<GeneratedStoryProps> = ({ story, onRegenerateField }) => {
  const [isRegenerating, setIsRegenerating] = useState<Record<string, boolean>>({});
  const [previousValues, setPreviousValues] = useState<Record<string, string | string[]>>({});
  const [showUndo, setShowUndo] = useState<Record<string, boolean>>({});

  const handleRegenerate = async (fieldName: keyof UserStory) => {
    const currentValue = story[fieldName];
    
    // Store previous value for undo
    setPreviousValues(prev => ({ ...prev, [fieldName]: currentValue }));
    
    // Set loading state
    setIsRegenerating(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      await onRegenerateField(fieldName, currentValue);
      
      // Show undo option briefly
      setShowUndo(prev => ({ ...prev, [fieldName]: true }));
      setTimeout(() => {
        setShowUndo(prev => ({ ...prev, [fieldName]: false }));
      }, 5000);
      
    } catch (error) {
      console.error(`Error regenerating ${fieldName}:`, error);
    } finally {
      setIsRegenerating(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleUndo = (fieldName: keyof UserStory) => {
    const previousValue = previousValues[fieldName];
    if (previousValue) {
      // In a real implementation, this would update the story
      console.log(`Undoing ${fieldName} to:`, previousValue);
      setShowUndo(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Generated Story</h2>
            <p className="text-sm text-gray-600">AI-powered user story</p>
          </div>
        </div>

        {/* User Guidance */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>How to use:</strong> Edit any field manually, or click "Regenerate" next to each field to refresh AI suggestions. Use "Undo" to revert recent changes.
          </p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">Title</label>
              </div>
              <div className="flex items-center gap-2">
                {showUndo.title && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUndo('title')}
                    className="h-8 px-2 text-xs text-orange-600 hover:text-orange-700"
                    title="Undo last regeneration"
                  >
                    <Undo2 className="w-3 h-3 mr-1" />
                    Undo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerate('title')}
                  disabled={isRegenerating.title}
                  className="h-8 px-3 text-xs"
                  title="Click to refresh this field with new AI-generated content"
                >
                  {isRegenerating.title ? (
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3 mr-1" />
                  )}
                  Regenerate Title
                </Button>
              </div>
            </div>
            <div className={`p-3 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300 ${
              showUndo.title ? 'ring-2 ring-green-200 bg-green-50' : ''
            }`}>
              <p className="text-gray-800 font-medium">{story.title}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <label className="text-sm font-medium text-gray-700">Description</label>
              </div>
              <div className="flex items-center gap-2">
                {showUndo.description && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUndo('description')}
                    className="h-8 px-2 text-xs text-orange-600 hover:text-orange-700"
                    title="Undo last regeneration"
                  >
                    <Undo2 className="w-3 h-3 mr-1" />
                    Undo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerate('description')}
                  disabled={isRegenerating.description}
                  className="h-8 px-3 text-xs"
                  title="Click to refresh this field with new AI-generated content"
                >
                  {isRegenerating.description ? (
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3 mr-1" />
                  )}
                  Regenerate Description
                </Button>
              </div>
            </div>
            <div className={`p-3 bg-purple-50 rounded-lg border border-purple-200 transition-all duration-300 ${
              showUndo.description ? 'ring-2 ring-green-200 bg-green-50' : ''
            }`}>
              <p className="text-gray-800">{story.description}</p>
            </div>
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <label className="text-sm font-medium text-gray-700">Acceptance Criteria</label>
                <Badge variant="secondary" className="text-xs">
                  {story.acceptanceCriteria.length} criteria
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {showUndo.acceptanceCriteria && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUndo('acceptanceCriteria')}
                    className="h-8 px-2 text-xs text-orange-600 hover:text-orange-700"
                    title="Undo last regeneration"
                  >
                    <Undo2 className="w-3 h-3 mr-1" />
                    Undo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerate('acceptanceCriteria')}
                  disabled={isRegenerating.acceptanceCriteria}
                  className="h-8 px-3 text-xs"
                  title="Click to refresh this field with new AI-generated content"
                >
                  {isRegenerating.acceptanceCriteria ? (
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3 mr-1" />
                  )}
                  Regenerate Criteria
                </Button>
              </div>
            </div>
            <div className={`p-3 bg-green-50 rounded-lg border border-green-200 transition-all duration-300 ${
              showUndo.acceptanceCriteria ? 'ring-2 ring-green-200 bg-green-50' : ''
            }`}>
              <ul className="space-y-2">
                {story.acceptanceCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-800 text-sm">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
