
import React from 'react';
import { GitBranch, Eye } from 'lucide-react';

interface ADOIntegrationSectionProps {
  previewMode?: boolean;
  storyGenerated?: boolean;
  storyPointEstimate: string;
  onStoryPointEstimateChange: (value: string) => void;
}

export const ADOIntegrationSection: React.FC<ADOIntegrationSectionProps> = ({ 
  previewMode = false, 
  storyGenerated = false,
  storyPointEstimate,
  onStoryPointEstimateChange
}) => {
  return (
    <div className="p-6 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#808384' }}>
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#002153' }}>Azure DevOps Integration</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
              Iteration
            </label>
            <select className="w-full p-2 border rounded" style={{ borderColor: '#808384' }}>
              <option value="">Select Iteration</option>
              <option>Sprint 1</option>
              <option>Sprint 2</option>
              <option>Sprint 3</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
              Tags
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded" 
              style={{ borderColor: '#808384' }}
              placeholder="tag1, tag2, tag3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
              Story Point Estimate
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded" 
              style={{ borderColor: '#808384' }}
              placeholder="e.g., 3, 8, XS, M, L"
              value={storyPointEstimate}
              onChange={(e) => onStoryPointEstimateChange(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
              Suggested by AI. You may edit or leave this blank.
            </div>
          </div>
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
          "Are you sure you want to create this work item in Azure DevOps?"
        </div>
      </div>
    </div>
  );
};
