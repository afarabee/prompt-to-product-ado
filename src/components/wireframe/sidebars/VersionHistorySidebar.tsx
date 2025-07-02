
import React from 'react';
import { X, RotateCcw } from 'lucide-react';

interface VersionHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistorySidebar: React.FC<VersionHistorySidebarProps> = ({ isOpen, onClose }) => {
  const sampleVersions = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:22',
      description: 'Initial user story creation',
      changes: 'Created title, description, and acceptance criteria'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:35:45',
      description: 'Updated description for clarity',
      changes: 'Modified description to include security requirements'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:42:18',
      description: 'Added acceptance criteria',
      changes: 'Added 3 new acceptance criteria focusing on user permissions'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:48:03',
      description: 'Refined title and description',
      changes: 'Shortened title and enhanced description with mobile responsiveness'
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#005AA7' }}>
          <h3 className="text-white font-semibold">Version History</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded p-1"
            title="Close Version History"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {sampleVersions.map((version) => (
              <div key={version.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium" style={{ color: '#002153' }}>
                    Version {version.id}
                  </div>
                  <div className="text-xs text-gray-500">
                    {version.timestamp}
                  </div>
                </div>
                
                <div className="text-sm text-gray-700 mb-2">
                  {version.description}
                </div>
                
                <div className="text-xs text-gray-600 mb-3">
                  {version.changes}
                </div>
                
                <button 
                  className="flex items-center gap-2 px-3 py-1 text-xs rounded border hover:bg-blue-50"
                  style={{ borderColor: '#005AA7', color: '#005AA7' }}
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore this version
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
};
