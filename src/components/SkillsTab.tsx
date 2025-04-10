import React from 'react';

const SkillsTab: React.FC = () => (
  <>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng hiện có</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">HTML</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">React</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Git</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Redux</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng còn thiếu</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">SQL</span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">React Router</span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">NextJS</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Từ khóa cần bổ sung</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Agile</span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Team working</span>
      </div>
    </div>
  </>
);

export default SkillsTab;