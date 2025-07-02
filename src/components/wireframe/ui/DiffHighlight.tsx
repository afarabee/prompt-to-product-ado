
import React from 'react';

interface DiffHighlightProps {
  text: string;
}

export const DiffHighlight: React.FC<DiffHighlightProps> = ({ text }) => {
  // Simulate diff highlighting - in a real implementation, this would parse actual diffs
  const parts = [
    { type: 'normal', text: 'As a ' },
    { type: 'insert', text: 'product owner' },
    { type: 'normal', text: ', I want ' },
    { type: 'delete', text: 'basic functionality' },
    { type: 'insert', text: 'enhanced user management' },
    { type: 'normal', text: ' so that...' }
  ];

  return (
    <div className="text-sm font-medium">
      {parts.map((part, index) => {
        if (part.type === 'insert') {
          return (
            <span key={index} className="bg-green-100 text-green-800 px-1 rounded">
              {part.text}
            </span>
          );
        } else if (part.type === 'delete') {
          return (
            <span key={index} className="bg-red-100 text-red-800 line-through px-1 rounded mx-1">
              {part.text}
            </span>
          );
        } else {
          return <span key={index}>{part.text}</span>;
        }
      })}
    </div>
  );
};
