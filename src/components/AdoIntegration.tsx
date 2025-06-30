
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitBranch, ExternalLink, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserStory } from '../pages/Index';

interface AdoIntegrationProps {
  story: UserStory;
  apiKeys: {
    openai: string;
    azureDevOps: string;
    adoOrganization: string;
    adoProject: string;
  };
}

export const AdoIntegration: React.FC<AdoIntegrationProps> = ({ story, apiKeys }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateWorkItem = async () => {
    if (!apiKeys.azureDevOps || !apiKeys.adoOrganization || !apiKeys.adoProject) {
      setError('Please configure all Azure DevOps settings');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Simulate API call to Azure DevOps
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In real implementation, this would make actual ADO REST API call
      console.log('Creating work item in Azure DevOps:', {
        organization: apiKeys.adoOrganization,
        project: apiKeys.adoProject,
        story
      });
      
      setCreated(true);
    } catch (err) {
      setError('Failed to create work item in Azure DevOps');
      console.error('ADO Integration Error:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const isConfigured = apiKeys.azureDevOps && apiKeys.adoOrganization && apiKeys.adoProject;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg">
            <GitBranch className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Azure DevOps Integration</h2>
            <p className="text-sm text-gray-600">Create work item in ADO</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Configuration Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Configuration Status</span>
              {isConfigured ? (
                <Badge className="bg-green-100 text-green-800 border border-green-300">
                  Ready
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border border-amber-300">
                  Incomplete
                </Badge>
              )}
            </div>
          </div>

          {/* Organization & Project Info */}
          {isConfigured && (
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <strong>Organization:</strong> {apiKeys.adoOrganization}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Project:</strong> {apiKeys.adoProject}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {created && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-green-800 text-sm">Work item created successfully!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            {!created ? (
              <Button
                onClick={handleCreateWorkItem}
                disabled={!isConfigured || isCreating}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Work Item...
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4" />
                    Create in Azure DevOps
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.open('#', '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                View in Azure DevOps
              </Button>
            )}
          </div>

          {!isConfigured && (
            <div className="text-xs text-gray-500 text-center">
              Configure Azure DevOps settings to enable work item creation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
