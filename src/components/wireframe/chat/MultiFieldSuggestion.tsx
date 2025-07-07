import React, { useState } from 'react';
import { SuggestionMessage } from './SuggestionMessage';
import { EditableMessage } from './EditableMessage';
import { CancellationMessage } from './CancellationMessage';

interface FieldSuggestion {
  fieldName: string;
  currentValue: string;
  suggestedContent: string;
}

interface MultiFieldSuggestionProps {
  suggestions: FieldSuggestion[];
  messageId: string;
  onReplace: (fieldName: string, content: string) => void;
  onEdit: (fieldName: string, content: string) => void;
  onCancel: (fieldName: string) => void;
  isLoading?: boolean;
}

interface FieldState {
  mode: 'suggestion' | 'editing' | 'canceled';
  editContent?: string;
}

export const MultiFieldSuggestion: React.FC<MultiFieldSuggestionProps> = ({
  suggestions,
  messageId,
  onReplace,
  onEdit,
  onCancel,
  isLoading = false
}) => {
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(() => {
    const initial: Record<string, FieldState> = {};
    suggestions.forEach(suggestion => {
      initial[suggestion.fieldName] = { mode: 'suggestion' };
    });
    return initial;
  });

  const handleEditMode = (fieldName: string, content: string) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { 
        mode: 'editing', 
        editContent: content 
      }
    }));
  };

  const handleCancelEdit = (fieldName: string) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { mode: 'suggestion' }
    }));
  };

  const handleApplyEdit = (fieldName: string, editedContent: string) => {
    onEdit(fieldName, editedContent);
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { mode: 'suggestion' }
    }));
  };

  const handleCancel = (fieldName: string) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { mode: 'canceled' }
    }));
    onCancel(fieldName);
  };

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => {
        const fieldState = fieldStates[suggestion.fieldName];
        
        if (fieldState.mode === 'canceled') {
          return (
            <CancellationMessage
              key={`${messageId}-${suggestion.fieldName}-canceled`}
              fieldName={suggestion.fieldName}
              timestamp={new Date()}
            />
          );
        }
        
        if (fieldState.mode === 'editing') {
          return (
            <EditableMessage
              key={`${messageId}-${suggestion.fieldName}-editing`}
              content={fieldState.editContent || suggestion.suggestedContent}
              affectedField={suggestion.fieldName}
              onApply={(editedContent) => handleApplyEdit(suggestion.fieldName, editedContent)}
              onCancel={() => handleCancelEdit(suggestion.fieldName)}
              isLoading={isLoading}
            />
          );
        }
        
        return (
          <SuggestionMessage
            key={`${messageId}-${suggestion.fieldName}`}
            content={suggestion.suggestedContent}
            affectedField={suggestion.fieldName}
            currentValue={suggestion.currentValue}
            onReplace={() => onReplace(suggestion.fieldName, suggestion.suggestedContent)}
            onEdit={() => handleEditMode(suggestion.fieldName, suggestion.suggestedContent)}
            onCancel={() => handleCancel(suggestion.fieldName)}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};