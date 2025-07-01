
import React from 'react';
import { User, Settings, BarChart3, MessageSquare, RefreshCw, Send, Eye, GitBranch, Users, History } from 'lucide-react';

export const Wireframe = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b-2" style={{ backgroundColor: '#002153', borderColor: '#808384' }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#005AA7' }}>
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-bold text-white">AI-to-ADO Story Creation POC</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <User className="w-4 h-4" />
            <span className="text-sm">Product Owner</span>
          </div>
          <button className="p-2 rounded hover:bg-blue-800 text-white">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r-2" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
          <nav className="p-4 space-y-2">
            <div className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Navigation</div>
            
            <button className="w-full text-left p-3 rounded-lg font-medium" style={{ backgroundColor: '#005AA7', color: 'white' }}>
              Story Generator
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Collaboration
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics Dashboard
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Version History
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-200" style={{ color: '#333333' }}>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                User Management
              </div>
            </button>
          </nav>

          {/* User Personas Section */}
          <div className="p-4 mt-8 border-t" style={{ borderColor: '#808384' }}>
            <div className="text-sm font-semibold mb-3" style={{ color: '#333333' }}>Active Personas</div>
            <div className="space-y-2">
              <div className="p-2 rounded" style={{ backgroundColor: '#005AA7', color: 'white' }}>
                <div className="text-xs font-medium">Product Owner</div>
                <div className="text-xs opacity-90">Story Creation</div>
              </div>
              <div className="p-2 rounded border" style={{ borderColor: '#808384', color: '#333333' }}>
                <div className="text-xs font-medium">Scrum Team</div>
                <div className="text-xs opacity-70">Review & Refine</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Top Section - Input & Configuration */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
                  <h2 className="text-lg font-semibold mb-4" style={{ color: '#002153' }}>Raw Input Section</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                        Story Input
                      </label>
                      <textarea 
                        className="w-full h-32 p-3 border rounded-lg resize-none" 
                        style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}
                        placeholder="Enter raw user story idea or prompt here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                          AI Model
                        </label>
                        <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
                          <option>GPT-4</option>
                          <option>GPT-3.5-turbo</option>
                          <option>Custom Model</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                          Custom Prompt
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded" 
                          style={{ borderColor: '#808384' }}
                          placeholder="Optional custom prompt"
                        />
                      </div>
                    </div>
                    
                    <button className="w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#005AA7' }}>
                      <RefreshCw className="w-4 h-4" />
                      Generate User Story
                    </button>
                  </div>
                </div>

                {/* OpenAI Configuration */}
                <div className="p-4 rounded-lg border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#002153' }}>OpenAI Configuration</h3>
                  <div className="text-xs space-y-1" style={{ color: '#333333' }}>
                    <div>• Prompt Engineering Settings</div>
                    <div>• Temperature & Token Controls</div>
                    <div>• Model Performance Metrics</div>
                  </div>
                </div>
              </div>

              {/* Generated Story Preview */}
              <div className="space-y-4">
                <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
                    <button className="p-2 rounded hover:bg-blue-50" style={{ color: '#005AA7' }}>
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium" style={{ color: '#333333' }}>Title</label>
                        <div className="flex gap-1">
                          <button className="p-1 rounded hover:bg-blue-50" title="Regenerate Title">
                            <RefreshCw className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                          <button className="p-1 rounded hover:bg-blue-50" title="Chat with this field">
                            <MessageSquare className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded border" style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}>
                        <div className="text-sm font-medium">As a [user type], I want [functionality]...</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium" style={{ color: '#333333' }}>Description</label>
                        <div className="flex gap-1">
                          <button className="p-1 rounded hover:bg-blue-50" title="Regenerate Description">
                            <RefreshCw className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                          <button className="p-1 rounded hover:bg-blue-50" title="Chat with this field">
                            <MessageSquare className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded border" style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}>
                        <div className="text-sm">Detailed story description following INVEST criteria...</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium" style={{ color: '#333333' }}>Acceptance Criteria</label>
                        <div className="flex gap-1">
                          <button className="p-1 rounded hover:bg-blue-50" title="Regenerate Criteria">
                            <RefreshCw className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                          <button className="p-1 rounded hover:bg-blue-50" title="Chat with this field">
                            <MessageSquare className="w-3 h-3" style={{ color: '#005AA7' }} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded border space-y-1" style={{ backgroundColor: '#FFFFFF', borderColor: '#808384' }}>
                        <div className="text-sm">• Given [condition], when [action], then [result]</div>
                        <div className="text-sm">• Verify [specific behavior]</div>
                        <div className="text-sm">• Ensure [quality criteria]</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INVEST Criteria Check */}
                <div className="p-4 rounded border" style={{ backgroundColor: '#00A0E3', borderColor: '#005AA7' }}>
                  <h3 className="text-sm font-semibold text-white mb-2">INVEST Criteria Validation</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs text-white">
                    <div>✓ Independent</div>
                    <div>✓ Negotiable</div>
                    <div>✓ Valuable</div>
                    <div>✓ Estimable</div>
                    <div>✓ Small</div>
                    <div>✓ Testable</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - ADO Integration & Collaboration */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Azure DevOps Integration */}
              <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#002153' }}>Azure DevOps Integration</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                        ADO Project
                      </label>
                      <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
                        <option>Project Alpha</option>
                        <option>Project Beta</option>
                        <option>Project Gamma</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                        Backlog
                      </label>
                      <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
                        <option>Sprint Backlog</option>
                        <option>Product Backlog</option>
                        <option>Epic Backlog</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                      Assignee
                    </label>
                    <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
                      <option>John Doe (Developer)</option>
                      <option>Jane Smith (Designer)</option>
                      <option>Mike Johnson (Tester)</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#005AA7' }}>
                      <GitBranch className="w-4 h-4" />
                      Push to ADO
                    </button>
                    <button className="px-4 py-3 rounded-lg border font-medium flex items-center justify-center gap-2" style={{ borderColor: '#808384', color: '#333333' }}>
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>

                {/* Confirmation Dialog Preview */}
                <div className="mt-4 p-3 rounded border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#002153' }}>Confirmation Dialog</div>
                  <div className="text-xs" style={{ color: '#333333' }}>
                    "Are you sure you want to create this work item in Project Alpha?"
                  </div>
                </div>
              </div>

              {/* Collaboration & Reporting */}
              <div className="space-y-4">
                {/* Team Collaboration */}
                <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
                  <h2 className="text-lg font-semibold mb-4" style={{ color: '#002153' }}>Team Collaboration</h2>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#005AA7' }}>
                          JS
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#333333' }}>Jane Smith</span>
                        <span className="text-xs" style={{ color: '#808384' }}>2 min ago</span>
                      </div>
                      <div className="text-sm" style={{ color: '#333333' }}>
                        "Looks good, but we should add more specific acceptance criteria for edge cases."
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-1 p-2 border rounded text-sm" 
                        style={{ borderColor: '#808384' }}
                      />
                      <button className="px-3 py-2 rounded text-white" style={{ backgroundColor: '#005AA7' }}>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Analytics Preview */}
                <div className="p-4 rounded-lg border" style={{ backgroundColor: '#00A0E3', borderColor: '#005AA7' }}>
                  <h3 className="text-sm font-semibold text-white mb-3">Quick Analytics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">94%</div>
                      <div className="text-xs text-white opacity-90">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">45m</div>
                      <div className="text-xs text-white opacity-90">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">4.8</div>
                      <div className="text-xs text-white opacity-90">User Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Features */}
            <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
              <div className="flex justify-between items-center text-sm" style={{ color: '#333333' }}>
                <div className="flex gap-6">
                  <span>✓ User Authentication</span>
                  <span>✓ Story Templates</span>
                  <span>✓ Version History</span>
                  <span>✓ Mobile Responsive</span>
                </div>
                <div className="text-xs" style={{ color: '#808384' }}>
                  Last updated: 2 minutes ago
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
