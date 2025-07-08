import React from 'react';
import { CheckCircle, Target, FileCheck, ArrowRight } from 'lucide-react';

const QAWorkspace = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">QA Workspace</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This workspace will help you write and manage test scenarios linked to your stories and features.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-semibold text-emerald-900">Coming Soon</h2>
          </div>
          <p className="text-emerald-800 mb-6">
            Comprehensive quality assurance tools for designing and managing test scenarios, validation steps, 
            and quality gates throughout the development lifecycle.
          </p>
          <ul className="space-y-3 text-emerald-700">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              AI-generated test scenarios from user stories and acceptance criteria
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Test case management and execution tracking
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Integration with development workflows and CI/CD pipelines
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Risk assessment and quality metrics dashboard
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Cross-functional collaboration tools for developers and QA teams
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <FileCheck className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Test Planning</h3>
            <p className="text-sm text-gray-600">Create comprehensive test plans aligned with story requirements</p>
          </div>
          
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <Target className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Scenario Design</h3>
            <p className="text-sm text-gray-600">Design detailed test scenarios covering edge cases and user paths</p>
          </div>
          
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Validation Steps</h3>
            <p className="text-sm text-gray-600">Define clear validation criteria and success metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAWorkspace;