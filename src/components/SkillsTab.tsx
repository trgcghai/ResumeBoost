import React from "react";

const SkillsTab: React.FC = () => (
  <>
    <div className="">
      <h3 className="text-md font-semibold mb-2">Kỹ năng hiện có</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-greenBgLight text-greenText px-3 py-1 rounded-full">
          HTML
        </span>
        <span className="bg-greenBgLight text-greenText px-3 py-1 rounded-full">
          React
        </span>
        <span className="bg-greenBgLight text-greenText px-3 py-1 rounded-full">
          Git
        </span>
        <span className="bg-greenBgLight text-greenText px-3 py-1 rounded-full">
          Redux
        </span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng còn thiếu</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-redBgLight text-redText px-3 py-1 rounded-full">
          SQL
        </span>
        <span className="bg-redBgLight text-redText px-3 py-1 rounded-full">
          React Router
        </span>
        <span className="bg-redBgLight text-redText px-3 py-1 rounded-full">
          NextJS
        </span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Từ khóa cần bổ sung</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-yellowBgLight text-yellowText px-3 py-1 rounded-full">
          Agile
        </span>
        <span className="bg-yellowBgLight text-yellowText px-3 py-1 rounded-full">
          Team working
        </span>
      </div>
    </div>
  </>
);

export default SkillsTab;
