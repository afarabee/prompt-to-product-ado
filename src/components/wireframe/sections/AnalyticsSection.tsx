
import React from 'react';

export const AnalyticsSection = () => {
  return (
    <div className="p-4 rounded-lg border" style={{ backgroundColor: '#00A0E3', borderColor: '#005AA7' }}>
      <h3 className="text-sm font-semibold text-white mb-3">Quick Analytics</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-white">94%</div>
          <div className="text-xs text-white opacity-90">Success Rate</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">45m</div>
          <div className="text-xs text-white opacity-90">Time Saved</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">4.8</div>
          <div className="text-xs text-white opacity-90">User Rating</div>
        </div>
      </div>
    </div>
  );
};
