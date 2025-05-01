export function calAvgScore(scores: {
  format: number;
  keywords: number;
  relevance: number;
  overall: number;
}) {
  return Math.round(
    (scores.format + scores.keywords + scores.relevance + scores.overall) / 4
  );
}
