import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { calAvgScore } from "@/utils/callAvgScore";
import { Analyses, CardData, Resume } from "@/type";

export function useUserResumes() {
  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentUser } = auth;

  useEffect(() => {
    async function fetchResumes() {
      if (!currentUser?.uid) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const resumesRef = collection(db, "resumes");
        const resumeQuery = query(
          resumesRef,
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const resumeSnapshot = await getDocs(resumeQuery);

        const analysesRef = collection(db, "analyses");
        const analysesQuery = query(
          analysesRef,
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const analysesSnapshot = await getDocs(analysesQuery);

        const analysesData = analysesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Analyses[];
        const resumesData = resumeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Resume[];

        const data = resumesData.map((resume) => {
          const analysis = analysesData.find(
            (analysis) => analysis.resumeId === resume.id
          );
          const avgScore = analysis ? calAvgScore(analysis.scores) : 0;
          return {
            resumeId: resume.id,
            analysisId: analysis ? analysis.id : "",
            title: resume.fileName,
            uploadTime: resume.createdAt,
            avgScore,
          };
        });
        setData(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch resumes")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, [currentUser]);

  return { data, loading, error };
}
