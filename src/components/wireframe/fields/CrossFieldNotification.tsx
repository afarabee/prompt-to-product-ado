
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CrossFieldNotificationProps {
  message: string;
  onAccept: () => void;
  onDismiss: () => void;
}

export const CrossFieldNotification: React.FC<CrossFieldNotificationProps> = ({ 
  message, 
  onAccept, 
  onDismiss 
}) => {
  return (
    <div className="mt-2 p-2 rounded border-l-4 bg-orange-50" style={{ borderColor: '#F97316' }}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-orange-600" />
        <span className="text-sm text-orange-800">{message}</span>
        <button 
          onClick={onAccept}
          className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded hover:bg-orange-200"
        >
          Yes, Update AC
        </button>
        <button 
          onClick={onDismiss}
          className="text-xs text-orange-600 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
