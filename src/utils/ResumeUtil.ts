import { CardData } from "@/type";
import { Timestamp } from "firebase/firestore";

function filterResumesByScore(
  resumes: CardData[],
  scoreFilter: string
): CardData[] {
  if (scoreFilter === "all") return resumes;

  return resumes.filter((resume) => {
    switch (scoreFilter) {
      case "high":
        return resume.avgScore >= 90;
      case "average":
        return resume.avgScore >= 70 && resume.avgScore < 90;
      case "low":
        return resume.avgScore < 70;
      default:
        return true;
    }
  });
}

function sortResumes(resumes: CardData[], sortCriterion: string): CardData[] {
  const getTimestamp = (time: Timestamp): number => time.toDate().getTime();

  switch (sortCriterion) {
    case "uploadDesc":
      return resumes.sort(
        (a, b) => getTimestamp(b.uploadTime) - getTimestamp(a.uploadTime)
      );
    case "uploadAsc":
      return resumes.sort(
        (a, b) => getTimestamp(a.uploadTime) - getTimestamp(b.uploadTime)
      );
    case "scoreDesc":
      return resumes.sort((a, b) => b.avgScore - a.avgScore);
    case "scoreAsc":
      return resumes.sort((a, b) => a.avgScore - b.avgScore);
    default:
      return resumes;
  }
}

export { filterResumesByScore, sortResumes };
