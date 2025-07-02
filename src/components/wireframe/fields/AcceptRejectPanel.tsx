
import React from 'react';

export const AcceptRejectPanel = () => {
  return (
    <div className="mt-4 p-3 rounded border bg-gray-50" style={{ borderColor: '#808384' }}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold" style={{ color: '#002153' }}>Pending Changes Preview</h4>
        <div className="flex gap-2">
          <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
            Accept All
          </button>
          <button className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
            Reject All
          </button>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-3 h-3" defaultChecked />
          <span>Add "product owner" to title</span>
          <button className="text-green-600 hover:underline">Accept</button>
          <button className="text-red-600 hover:underline">Reject</button>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-3 h-3" defaultChecked />
          <span>Remove "basic functionality"</span>
          <button className="text-green-600 hover:underline">Accept</button>
          <button className="text-red-600 hover:underline">Reject</button>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-3 h-3" defaultChecked />
          <span>Add "enhanced user management"</span>
          <button className="text-green-600 hover:underline">Accept</button>
          <button className="text-red-600 hover:underline">Reject</button>
        </div>
      </div>
      <button className="mt-2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
        Apply Selected Changes
      </button>
    </div>
  );
};
