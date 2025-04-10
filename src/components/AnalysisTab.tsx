import React from 'react';

const AnalysisTab: React.FC = () => (
  <>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Phân tích kỹ năng</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">JavaScript</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">TypeScript</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">CSS</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng cần cải thiện</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Node.js</span>
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Express</span>
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">MongoDB</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Từ khóa cần chú ý</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Scrum</span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Communication</span>
      </div>
    </div>
  </>
);

export default AnalysisTab;