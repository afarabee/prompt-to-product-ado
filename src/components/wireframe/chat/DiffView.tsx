import React from 'react';

interface DiffViewProps {
  originalContent: string;
  newContent: string;
  fieldName: string;
}

export const DiffView: React.FC<DiffViewProps> = ({
  originalContent,
  newContent,
  fieldName
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">Preview Changes to {fieldName}</h4>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Current:</p>
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
              {originalContent || '(Empty)'}
            </pre>
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">New:</p>
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
              {newContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};