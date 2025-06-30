
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

interface StoryInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export const StoryInput: React.FC<StoryInputProps> = ({
  value,
  onChange,
  onGenerate,
  isGenerating,
  disabled
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Story Input</h2>
          <p className="text-sm text-gray-600">Describe your user story idea</p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Enter your raw user story idea or prompt here... 

Example: 'Users need to be able to filter products by price range and category on the e-commerce website'"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-200"
          disabled={disabled}
        />

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {value.length} characters
          </div>
          
          <Button
            onClick={onGenerate}
            disabled={!value.trim() || isGenerating || disabled}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 flex items-center gap-2 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Story
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
