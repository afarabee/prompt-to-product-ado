import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DependencyNotificationProps {
  sourceField: string;
  targetField: string;
  onClickField: () => void;
  onDismiss: () => void;
}

export const DependencyNotification: React.FC<DependencyNotificationProps> = ({ 
  sourceField, 
  targetField, 
  onClickField, 
  onDismiss 
}) => {
  return (
    <div className="mt-2 p-3 rounded border-l-4 bg-blue-50" style={{ borderColor: '#005AA7' }}>
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm text-blue-800">
            Heads up: Your recent change in {sourceField} may affect the content in {targetField}. You may want to revisit it for consistency.
          </span>
          <div className="mt-2 flex gap-2">
            <button 
              onClick={onClickField}
              className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
            >
              Open {targetField} Chat
            </button>
            <button 
              onClick={onDismiss}
              className="text-xs text-blue-600 hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
