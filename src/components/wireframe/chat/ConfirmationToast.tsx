import React, { useEffect } from 'react';
import { Check, Undo } from 'lucide-react';

interface ConfirmationToastProps {
  fieldName: string;
  onUndo: () => void;
  onDismiss: () => void;
  autoHideDelay?: number;
}

export const ConfirmationToast: React.FC<ConfirmationToastProps> = ({
  fieldName,
  onUndo,
  onDismiss,
  autoHideDelay = 10000
}) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, autoHideDelay);
    return () => clearTimeout(timer);
  }, [onDismiss, autoHideDelay]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">
            ✅ Changes successfully applied to {fieldName}
          </span>
        </div>
        
        <button
          onClick={onUndo}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          title="Undo last change to this section"
        >
          <Undo className="w-4 h-4" />
          Undo
        </button>
      </div>
    </div>
  );
};