
import React from 'react';
import { X, Upload } from 'lucide-react';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ backgroundColor: '#005AA7' }}>
              <h2 className="text-xl font-semibold text-white">User Management</h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-700 rounded p-1"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* ADO Project */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  ADO Project
                </label>
                <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#808384' }}>
                  <option value="">Select Project</option>
                  <option value="project1">Customer Portal - Phase 2</option>
                  <option value="project2">Mobile App Enhancement</option>
                  <option value="project3">API Integration Platform</option>
                </select>
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  Custom Instructions
                </label>
                <textarea
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                  style={{ borderColor: '#808384' }}
                  defaultValue="When generating user stories, always include:
- Security considerations for user data
- Mobile responsiveness requirements
- Accessibility compliance (WCAG 2.1 AA)
- Performance metrics and acceptance criteria
- Integration requirements with existing systems"
                />
              </div>

              {/* Custom Knowledgebase */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  Custom Knowledgebase
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload documentation, style guides, or reference materials
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="knowledgebase-upload"
                  />
                  <label
                    htmlFor="knowledgebase-upload"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Choose Files
                  </label>
                  <div className="mt-4 text-xs text-gray-500">
                    <div>Current files:</div>
                    <div>• Company_Style_Guide.pdf</div>
                    <div>• API_Documentation.docx</div>
                    <div>• User_Research_Summary.pdf</div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                  Preferences
                </label>
                <textarea
                  className="w-full h-24 p-3 border rounded-lg resize-none"
                  style={{ borderColor: '#808384' }}
                  defaultValue="Default story format: As a [user type], I want [functionality] so that [benefit]
Always include: Given/When/Then format for acceptance criteria
Preferred estimation: Story points (Fibonacci sequence)
Default tags: frontend, backend, ux, security"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                style={{ borderColor: '#808384', color: '#333333' }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: '#005AA7' }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
