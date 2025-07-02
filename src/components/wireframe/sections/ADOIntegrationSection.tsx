
import React from 'react';
import { GitBranch, Eye } from 'lucide-react';

export const ADOIntegrationSection = () => {
  return (
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

      <div className="mt-4 p-3 rounded border" style={{ backgroundColor: '#CFD4D7', borderColor: '#808384' }}>
        <div className="text-xs font-medium mb-1" style={{ color: '#002153' }}>Confirmation Dialog</div>
        <div className="text-xs" style={{ color: '#333333' }}>
          "Are you sure you want to create this work item in Project Alpha?"
        </div>
      </div>
    </div>
  );
};
