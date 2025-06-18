import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      <span className="ml-3 text-gray-400">Loading real-time financial data...</span>
    </div>
  );
};

export default LoadingSpinner;