import React from 'react';
import { User, Settings, BarChart3, MessageSquare, RefreshCw, Send, Eye, GitBranch, Users, History, Copy, Check, X, AlertCircle } from 'lucide-react';

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

      <div className="flex h-screen relative">
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

              {/* Generated Story Preview with Enhanced Interactions */}
              <div className="space-y-4">
                <div className="p-6 rounded-lg border-2 relative" style={{ backgroundColor: 'white', borderColor: '#00A0E3' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold" style={{ color: '#002153' }}>Generated User Story</h2>
                    <div className="flex gap-2">
                      <button className="p-2 rounded hover:bg-blue-50 flex items-center gap-1" style={{ color: '#005AA7' }} title="Copy entire story to clipboard">
                        <Copy className="w-4 h-4" />
                        <span className="text-xs">Copy</span>
                      </button>
                      <button className="p-2 rounded hover:bg-blue-50" style={{ color: '#005AA7' }}>
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Title Field with Track Changes */}
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
                        <div className="text-sm font-medium">
                          As a <span className="bg-green-100 text-green-800 px-1 rounded">product owner</span>, I want 
                          <span className="bg-red-100 text-red-800 line-through px-1 rounded mx-1">basic functionality</span>
                          <span className="bg-green-100 text-green-800 px-1 rounded">enhanced user management</span> so that...
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">3 changes</span>
                          <button className="text-xs text-green-600 hover:underline">Preview Changes</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description Field with Dependency Notification */}
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
                      
                      {/* Cross-field Dependency Notification */}
                      <div className="mt-2 p-2 rounded border-l-4 bg-orange-50" style={{ borderColor: '#F97316' }}>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-800">Description changed. Regenerate Acceptance Criteria?</span>
                          <button className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded hover:bg-orange-200">
                            Yes, Update AC
                          </button>
                          <button className="text-xs text-orange-600 hover:underline">Dismiss</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Acceptance Criteria with Potential Changes Highlight */}
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
                      <div className="p-3 rounded border-2 space-y-1" style={{ backgroundColor: '#FFFFFF', borderColor: '#F97316' }}>
                        <div className="text-sm">• Given [condition], when [action], then [result]</div>
                        <div className="text-sm">• Verify [specific behavior]</div>
                        <div className="text-sm">• Ensure [quality criteria]</div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">⚠ May need updates due to description changes</div>
                      </div>
                    </div>
                  </div>

                  {/* Change Preview Panel */}
                  <div className="mt-4 p-3 rounded border bg-gray-50" style={{ borderColor: '#808384' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold" style={{ color: '#002153' }}>Pending Changes Preview</h4>
                      <div className="flex gap-2">
                        <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
                          Accept All
                        </button>
                        <button className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
                          Reject All
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3 h-3" defaultChecked />
                        <span>Add "product owner" to title</span>
                        <button className="text-green-600 hover:underline">Accept</button>
                        <button className="text-red-600 hover:underline">Reject</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3 h-3" defaultChecked />
                        <span>Remove "basic functionality"</span>
                        <button className="text-green-600 hover:underline">Accept</button>
                        <button className="text-red-600 hover:underline">Reject</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3 h-3" defaultChecked />
                        <span>Add "enhanced user management"</span>
                        <button className="text-green-600 hover:underline">Accept</button>
                        <button className="text-red-600 hover:underline">Reject</button>
                      </div>
                    </div>
                    <button className="mt-2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
                      Apply Selected Changes
                    </button>
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
                  <span>✓ AI Chat Integration</span>
                  <span>✓ Track Changes</span>
                </div>
                <div className="text-xs" style={{ color: '#808384' }}>
                  Last updated: 2 minutes ago
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Chat Drawer - Slides out from right */}
        <div className="fixed right-0 top-16 bottom-0 w-96 bg-white border-l-2 shadow-xl transform translate-x-0 z-20" style={{ borderColor: '#808384' }}>
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b" style={{ backgroundColor: '#005AA7', borderColor: '#808384' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Chat: Description Field</h3>
                  <p className="text-blue-100 text-sm">Refine this field with AI assistance</p>
                </div>
                <button className="text-white hover:bg-blue-600 p-1 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">AI Assistant</div>
                <div className="text-sm text-blue-700">
                  I can help you refine the description field. What specific changes would you like to make?
                </div>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg ml-8">
                <div className="text-sm font-medium text-gray-800 mb-1">You</div>
                <div className="text-sm text-gray-700">
                  Make it more specific about user management features and add acceptance criteria for mobile compatibility
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">AI Assistant</div>
                <div className="text-sm text-blue-700 mb-2">
                  I suggest updating the description to focus on specific user management features. Here's my proposed change:
                </div>
                <div className="text-xs bg-white p-2 rounded border">
                  <div className="mb-1">Current: "Detailed story description following INVEST criteria..."</div>
                  <div className="text-green-700">Suggested: "As a product owner, I want comprehensive user management functionality including role assignments, permission controls, and mobile-responsive interface so that I can efficiently manage team access across all devices."</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200">
                    Accept Changes
                  </button>
                  <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200">
                    Reject Changes
                  </button>
                  <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200">
                    Modify Further
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t" style={{ borderColor: '#808384' }}>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Describe the changes you want..." 
                  className="flex-1 p-2 border rounded text-sm" 
                  style={{ borderColor: '#808384' }}
                />
                <button className="px-3 py-2 rounded text-white" style={{ backgroundColor: '#005AA7' }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                💡 Try: "Add more detail about..." or "Make it shorter" or "Focus on security aspects"
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for drawer */}
        <div className="fixed inset-0 bg-black bg-opacity-20 z-10"></div>
      </div>
    </div>
  );
};
