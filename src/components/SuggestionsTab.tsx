import React from 'react';

const SuggestionsTab: React.FC = () => (
  <>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Gợi ý kỹ năng</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">GraphQL</span>
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Docker</span>
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Kubernetes</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng nên học</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">AWS</span>
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Firebase</span>
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">CI/CD</span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Từ khóa nên thêm</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">DevOps</span>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Problem Solving</span>
      </div>
    </div>
  </>
);

export default SuggestionsTab;