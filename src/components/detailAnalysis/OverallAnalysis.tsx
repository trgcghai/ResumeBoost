import { Analyses } from "@/type";
import { calAvgScore } from "@/utils/callAvgScore";
import React from "react";

interface OverallAnalysisProps {
  analysisData: Analyses | null;
}

const ScoreCircle = ({ score }: { score: number }) => {
  // Function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "border-green-500";
    if (score >= 60) return "border-yellow-500";
    return "border-red-500";
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div
          className={`w-24 h-24 rounded-full border-4 ${getScoreColor(
            score
          )} flex items-center justify-center`}
        >
          <span className="text-2xl font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  // Function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{score}</span>
      </div>
      <div className="w-full bg-bgNormal rounded-full h-2.5">
        <div
          className={`${getScoreColor(score)} h-2.5 rounded-full`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

const OverallAnalysis: React.FC<OverallAnalysisProps> = ({ analysisData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Đánh giá tổng quan</h2>

      <ScoreCircle
        score={calAvgScore(
          analysisData?.scores || {
            format: 0,
            keywords: 0,
            relevance: 0,
            overall: 0,
          }
        )}
      />
      <div className="space-y-4 grid grid-cols-2 gap-6">
        <ScoreBar
          label="Mức độ phù hợp"
          score={analysisData?.scores.overall || 0}
        />
        <ScoreBar
          label="Từ khóa phù hợp"
          score={analysisData?.scores.keywords || 0}
        />
        <ScoreBar label="Định dạng" score={analysisData?.scores.format || 0} />
        <ScoreBar
          label="Độ liên quan"
          score={analysisData?.scores.relevance || 0}
        />
      </div>
    </div>
  );
};

export default OverallAnalysis;
