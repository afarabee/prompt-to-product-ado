
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Lightbulb, 
  FileText, 
  Users, 
  CheckCircle, 
  Brain, 
  MessageSquare, 
  History, 
  Settings 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AppSidebarProps {
  onVersionHistoryClick?: () => void;
  onAIChatClick?: () => void;
  onProjectConfigClick?: () => void;
  showStoryReviewChat?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  onVersionHistoryClick, 
  onAIChatClick,
  onProjectConfigClick,
  showStoryReviewChat 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const workspaces = [
    {
      path: '/feature-generator',
      name: 'Feature Generator',
      icon: Lightbulb,
      description: 'AI-assisted feature definition'
    },
    {
      path: '/story-builder',
      name: 'Story Builder',
      icon: FileText,
      description: 'Create and refine user stories'
    },
    {
      path: '/ocm-hub',
      name: 'OCM Hub',
      icon: Users,
      description: 'Organizational Change Management'
    },
    {
      path: '/qa-workspace',
      name: 'QA Workspace',
      icon: CheckCircle,
      description: 'Test scenarios and validation'
    },
    {
      path: '/backlog-intelligence',
      name: 'Backlog Intelligence Assistant',
      icon: Brain,
      description: 'Query ADO data with natural language'
    }
  ];

  const isActiveWorkspace = (path: string) => {
    return location.pathname === path || (path === '/story-builder' && location.pathname === '/wireframe');
  };

  const handleWorkspaceClick = (path: string) => {
    navigate(path);
  };

  return (
    <TooltipProvider>
      <aside className="w-64 border-r-2" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
        <nav className="p-4 space-y-6">
          {/* Workspaces Section */}
          <div>
            <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>
              Workspaces
            </div>
            <div className="space-y-1">
              {workspaces.map((workspace) => {
                const Icon = workspace.icon;
                const isActive = isActiveWorkspace(workspace.path);
                
                return (
                  <Tooltip key={workspace.path}>
                    <TooltipTrigger asChild>
                      <button 
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'font-medium' 
                            : 'hover:bg-gray-200'
                        }`}
                        style={{ 
                          backgroundColor: isActive ? '#005AA7' : 'transparent',
                          color: isActive ? 'white' : '#333333'
                        }}
                        onClick={() => handleWorkspaceClick(workspace.path)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{workspace.name}</span>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{workspace.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-400 mx-2" />
          
          {/* Tools & Utilities Section */}
          <div>
            <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>
              Tools & Utilities
            </div>
            <div className="space-y-1">
              {!showStoryReviewChat && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors" 
                      style={{ color: '#333333' }}
                      onClick={onAIChatClick}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Ask AI!</span>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Use the AI Assistant to brainstorm, troubleshoot, or ask questions unrelated to a specific story.</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors" 
                    style={{ color: '#333333' }}
                    onClick={onVersionHistoryClick}
                  >
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      <span className="text-sm">Version History</span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>View earlier drafts and compare changes over time.</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors" 
                    style={{ color: '#333333' }}
                    onClick={onProjectConfigClick}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Project Configuration</span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Manage project context, preferences, and AI behavior settings for this project.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
