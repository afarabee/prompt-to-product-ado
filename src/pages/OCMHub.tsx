import React from 'react';
import { Users, MessageCircle, Calendar, TrendingUp } from 'lucide-react';

const OCMHub = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">OCM Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Workspace for Organizational Change Management and Communications planning. 
            Design and execute change strategies that ensure successful adoption of new features and processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Communications Planning</h3>
            </div>
            <p className="text-green-700">
              Develop targeted communication strategies for different stakeholder groups and phases of change implementation.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Change Roadmaps</h3>
            </div>
            <p className="text-blue-700">
              Create detailed timelines and milestones for organizational change initiatives tied to feature releases.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">Stakeholder Management</h3>
            </div>
            <p className="text-purple-700">
              Map stakeholders, assess change readiness, and develop targeted engagement strategies for successful adoption.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-900">Success Metrics</h3>
            </div>
            <p className="text-orange-700">
              Define and track key performance indicators to measure the effectiveness of change management efforts.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            This workspace is currently under development. It will provide comprehensive tools for managing 
            organizational change and communications around your product development initiatives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OCMHub;