interface AnalysisTabProps {
  strengths: string[];
  weaknesses: string[];
}

const AnalysisTab = ({ analysis }: { analysis: AnalysisTabProps }) => {
  return (
    <>
      <div className="">
        <h3 className="text-md font-semibold mb-2">Điểm mạnh</h3>
        <div className="flex flex-wrap gap-2">
          <ul>
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-green-700 py-1 rounded-full">
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Điểm yếu</h3>
        <div className="flex flex-wrap gap-2">
          <ul>
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="text-red-700 py-1 rounded-full">
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AnalysisTab;
