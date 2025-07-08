import React from 'react';
import { Lightbulb, ArrowRight, Zap } from 'lucide-react';

const FeatureGenerator = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Feature Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-assisted feature definition workspace that helps you conceptualize and define features, which may then generate user stories for implementation.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-900">Coming Soon</h2>
          </div>
          <p className="text-blue-800 mb-6">
            This workspace will provide AI-powered assistance for feature ideation, definition, and breakdown. 
            Features may include:
          </p>
          <ul className="space-y-3 text-blue-700">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Intelligent feature brainstorming and scoping
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Market research and competitive analysis integration
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              User persona-driven feature validation
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Automatic story generation from defined features
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Impact assessment and prioritization recommendations
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-gray-500">
            This workspace is currently under development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureGenerator;