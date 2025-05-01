interface SkillsTabProps {
  keywordsToAdd: string[];
  missing: string[];
  present: string[];
}

const SkillsTab = ({ skills }: { skills: SkillsTabProps }) => (
  <>
    <div className="">
      <h3 className="text-md font-semibold mb-2">Kỹ năng hiện có</h3>
      <div className="flex flex-wrap gap-2">
        {skills.present.map((skill: string, index: number) => (
          <span
            key={index}
            className="bg-greenBgLight text-greenText px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Kỹ năng còn thiếu</h3>
      <div className="flex flex-wrap gap-2">
        {skills.missing.map((skill: string, index: number) => (
          <span
            key={index}
            className="bg-redBgLight text-redText px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Từ khóa cần bổ sung</h3>
      <div className="flex flex-wrap gap-2">
        {skills.keywordsToAdd.map((skill: string, index: number) => (
          <span
            key={index}
            className="bg-yellowBgLight text-yellowText px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default SkillsTab;
