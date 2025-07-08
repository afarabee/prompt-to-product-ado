import React, { useState } from 'react';
import { X, Settings, User, Brain, Link, Save } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectConfigDrawer: React.FC<ProjectConfigDrawerProps> = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('My Product Project');
  const [projectDescription, setProjectDescription] = useState('');
  const [aiStyle, setAiStyle] = useState('balanced');
  const [adoConnection, setAdoConnection] = useState('');

  const handleSave = () => {
    // Save configuration logic here
    console.log('Saving project configuration...');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <TooltipProvider>
      <div className="fixed inset-0 z-50 flex">
        <div className="w-96 bg-white border-r shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-lg">Project Configuration</h3>
                <p className="text-sm text-gray-600">Manage project context, preferences, and AI behavior settings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Project Context */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-gray-900">Project Context</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe your project, target users, and key goals..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This context helps AI provide more relevant suggestions across all workspaces.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Behavior Preferences */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <h4 className="font-medium text-gray-900">AI Behavior Preferences</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AI Communication Style
                  </label>
                  <select
                    value={aiStyle}
                    onChange={(e) => setAiStyle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="concise">Concise - Brief, to-the-point responses</option>
                    <option value="balanced">Balanced - Moderate detail with explanations</option>
                    <option value="detailed">Detailed - Comprehensive responses with examples</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Enable proactive suggestions</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Auto-highlight affected fields</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Advanced technical recommendations</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Integration Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4 text-green-600" />
                <h4 className="font-medium text-gray-900">Integration Settings</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Azure DevOps Organization URL
                  </label>
                  <input
                    type="url"
                    value={adoConnection}
                    onChange={(e) => setAdoConnection(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://dev.azure.com/yourorg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Connect to ADO for enhanced backlog intelligence and story sync.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Integration settings will be available in the next release. 
                    Configure these now to be ready for enhanced features.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        
        {/* Backdrop */}
        <div className="flex-1 bg-black bg-opacity-25" onClick={onClose} />
      </div>
    </TooltipProvider>
  );
};