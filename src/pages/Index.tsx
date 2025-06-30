
import React, { useState } from 'react';
import { StoryInput } from '../components/StoryInput';
import { GeneratedStory } from '../components/GeneratedStory';
import { AdoIntegration } from '../components/AdoIntegration';
import { ConfigPanel } from '../components/ConfigPanel';
import { Settings, Sparkles, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface UserStory {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

const Index = () => {
  const [rawInput, setRawInput] = useState('');
  const [generatedStory, setGeneratedStory] = useState<UserStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    azureDevOps: '',
    adoOrganization: '',
    adoProject: ''
  });

  const handleGenerate = async () => {
    if (!rawInput.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call - in real implementation, this would call OpenAI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated story based on input
      const mockStory: UserStory = {
        title: `User Story: ${rawInput.split(' ').slice(0, 5).join(' ')}`,
        description: `As a user, I want to ${rawInput.toLowerCase()} so that I can achieve my goals more effectively.`,
        acceptanceCriteria: [
          'Given the user is on the main page',
          'When they interact with the feature',
          'Then they should see the expected result',
          'And the system should respond appropriately'
        ]
      };
      
      setGeneratedStory(mockStory);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Story Generator
              </h1>
              <p className="text-sm text-gray-600">Generate user stories for Azure DevOps</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/wireframe'}
              className="flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              View Wireframe
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Configuration Panel */}
        {showConfig && (
          <div className="mb-8">
            <ConfigPanel apiKeys={apiKeys} setApiKeys={setApiKeys} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <StoryInput
              value={rawInput}
              onChange={setRawInput}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              disabled={false}
            />
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                📝 <strong>Demo Mode:</strong> This is a stubbed version. Enter any story idea and click "Generate Story" to see the AI-powered interface in action!
              </p>
            </div>
          </div>

          {/* Right Column - Generated Story & ADO Integration */}
          <div className="space-y-6">
            {generatedStory && (
              <>
                <GeneratedStory story={generatedStory} />
                <AdoIntegration 
                  story={generatedStory} 
                  apiKeys={apiKeys}
                />
              </>
            )}
            
            {!generatedStory && (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 p-8 text-center">
                <GitBranch className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Generated Story Preview
                </h3>
                <p className="text-gray-500">
                  Your AI-generated user story will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
