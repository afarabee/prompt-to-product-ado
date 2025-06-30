
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Key, Settings, GitBranch } from 'lucide-react';

interface ConfigPanelProps {
  apiKeys: {
    openai: string;
    azureDevOps: string;
    adoOrganization: string;
    adoProject: string;
  };
  setApiKeys: (keys: any) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ apiKeys, setApiKeys }) => {
  const updateKey = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Configuration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OpenAI Configuration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold text-gray-800">OpenAI Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key
            </Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={apiKeys.openai}
              onChange={(e) => updateKey('openai', e.target.value)}
              className="border-green-200 focus:border-green-400"
            />
            <p className="text-xs text-gray-500">
              Required for AI story generation. Get your key from OpenAI Platform.
            </p>
          </div>
        </div>

        <Separator />

        {/* Azure DevOps Configuration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Azure DevOps Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ado-token" className="text-sm font-medium">
                Personal Access Token
              </Label>
              <Input
                id="ado-token"
                type="password"
                placeholder="Enter PAT token"
                value={apiKeys.azureDevOps}
                onChange={(e) => updateKey('azureDevOps', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ado-org" className="text-sm font-medium">
                Organization
              </Label>
              <Input
                id="ado-org"
                placeholder="your-organization"
                value={apiKeys.adoOrganization}
                onChange={(e) => updateKey('adoOrganization', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ado-project" className="text-sm font-medium">
                Project Name
              </Label>
              <Input
                id="ado-project"
                placeholder="Your Project Name"
                value={apiKeys.adoProject}
                onChange={(e) => updateKey('adoProject', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            Required for creating work items. Ensure your PAT has Work Items (read & write) permissions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
