import React from 'react';
import { Brain, Database, Search, BarChart3, ArrowRight } from 'lucide-react';

const BacklogIntelligence = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Backlog Intelligence Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Query your Azure DevOps data using natural language. Get insights, analyze trends, 
            and make data-driven decisions about your product backlog.
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-indigo-900">Coming Soon</h2>
          </div>
          <p className="text-indigo-800 mb-6">
            Natural language interface for Azure DevOps data analysis and backlog intelligence. 
            Ask questions about your backlog and get instant insights.
          </p>
          <ul className="space-y-3 text-indigo-700">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              "How many story points are in our current sprint?"
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              "Which features have been delayed the most this quarter?"
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              "What's the average cycle time for user stories?"
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              "Show me burndown trends for the last three sprints"
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              "Which work items are blocked and why?"
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <Search className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Natural Language Queries</h3>
            <p className="text-sm text-gray-600">Ask questions in plain English and get immediate answers</p>
          </div>
          
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <BarChart3 className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-sm text-gray-600">Deep insights into team performance and backlog health</p>
          </div>
          
          <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
            <Database className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">ADO Integration</h3>
            <p className="text-sm text-gray-600">Direct connection to your Azure DevOps data and workflows</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklogIntelligence;