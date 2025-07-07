import React from 'react';

interface InlineDiffViewProps {
  originalContent: string;
  newContent: string;
  fieldName: string;
}

interface DiffWord {
  text: string;
  type: 'equal' | 'added' | 'removed';
}

export const InlineDiffView: React.FC<InlineDiffViewProps> = ({
  originalContent,
  newContent,
  fieldName
}) => {
  
  const computeWordDiff = (original: string, newText: string): DiffWord[] => {
    const originalWords = original.split(/(\s+|[.,!?;:])/);
    const newWords = newText.split(/(\s+|[.,!?;:])/);
    
    const result: DiffWord[] = [];
    let i = 0, j = 0;
    
    while (i < originalWords.length || j < newWords.length) {
      if (i >= originalWords.length) {
        // Remaining words are additions
        while (j < newWords.length) {
          if (newWords[j].trim()) {
            result.push({ text: newWords[j], type: 'added' });
          } else {
            result.push({ text: newWords[j], type: 'equal' });
          }
          j++;
        }
        break;
      }
      
      if (j >= newWords.length) {
        // Remaining words are removals
        while (i < originalWords.length) {
          if (originalWords[i].trim()) {
            result.push({ text: originalWords[i], type: 'removed' });
          } else {
            result.push({ text: originalWords[i], type: 'equal' });
          }
          i++;
        }
        break;
      }
      
      if (originalWords[i] === newWords[j]) {
        result.push({ text: originalWords[i], type: 'equal' });
        i++;
        j++;
      } else {
        // Look ahead to find matches
        let foundMatch = false;
        
        // Check if current original word appears later in new text
        for (let k = j + 1; k < Math.min(j + 5, newWords.length); k++) {
          if (originalWords[i] === newWords[k]) {
            // Add new words as additions
            for (let l = j; l < k; l++) {
              if (newWords[l].trim()) {
                result.push({ text: newWords[l], type: 'added' });
              } else {
                result.push({ text: newWords[l], type: 'equal' });
              }
            }
            j = k;
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          // Check if current new word appears later in original text
          for (let k = i + 1; k < Math.min(i + 5, originalWords.length); k++) {
            if (newWords[j] === originalWords[k]) {
              // Add original words as removals
              for (let l = i; l < k; l++) {
                if (originalWords[l].trim()) {
                  result.push({ text: originalWords[l], type: 'removed' });
                } else {
                  result.push({ text: originalWords[l], type: 'equal' });
                }
              }
              i = k;
              foundMatch = true;
              break;
            }
          }
        }
        
        if (!foundMatch) {
          // No match found, treat as replacement
          if (originalWords[i].trim()) {
            result.push({ text: originalWords[i], type: 'removed' });
          } else {
            result.push({ text: originalWords[i], type: 'equal' });
          }
          i++;
          
          if (newWords[j].trim()) {
            result.push({ text: newWords[j], type: 'added' });
          } else {
            result.push({ text: newWords[j], type: 'equal' });
          }
          j++;
        }
      }
    }
    
    return result;
  };

  const diffWords = computeWordDiff(originalContent, newContent);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">Inline Changes to {fieldName}</h4>
      
      <div className="bg-white border border-gray-200 rounded p-3">
        <div className="text-sm leading-relaxed">
          {diffWords.map((word, index) => {
            if (word.type === 'equal') {
              return <span key={index}>{word.text}</span>;
            } else if (word.type === 'removed') {
              return (
                <span 
                  key={index} 
                  className="bg-red-100 text-red-800 line-through"
                  title="Removed text"
                >
                  –{word.text}
                </span>
              );
            } else if (word.type === 'added') {
              return (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800"
                  title="Added text"
                >
                  +{word.text}
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 bg-green-100 border border-green-200 rounded"></span>
          Additions
        </span>
        <span className="inline-flex items-center gap-1 ml-4">
          <span className="w-3 h-3 bg-red-100 border border-red-200 rounded"></span>
          Deletions
        </span>
      </div>
    </div>
  );
};