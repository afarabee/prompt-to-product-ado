
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Target } from 'lucide-react';
import { UserStory } from '../pages/Index';

interface GeneratedStoryProps {
  story: UserStory;
}

export const GeneratedStory: React.FC<GeneratedStoryProps> = ({ story }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Generated Story</h2>
            <p className="text-sm text-gray-600">AI-powered user story</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Title</label>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-800 font-medium">{story.title}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              <label className="text-sm font-medium text-gray-700">Description</label>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-gray-800">{story.description}</p>
            </div>
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <label className="text-sm font-medium text-gray-700">Acceptance Criteria</label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {story.acceptanceCriteria.length} criteria
              </Badge>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <ul className="space-y-2">
                {story.acceptanceCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-800 text-sm">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
