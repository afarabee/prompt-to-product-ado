import React from 'react';
import { X } from 'lucide-react';

interface CancellationMessageProps {
  fieldName: string;
  timestamp: Date;
}

export const CancellationMessage: React.FC<CancellationMessageProps> = ({
  fieldName,
  timestamp
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fade-in">
      <div className="flex items-center gap-2 text-gray-600">
        <X className="w-4 h-4 text-gray-500" />
        <span className="text-sm">
          Change suggestion for <strong>{fieldName}</strong> was canceled.
        </span>
      </div>
    </div>
  );
};