// src/hooks/useAnalysisData.ts
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Analyses } from "@/type";

export function useAnalysisData(analysisId: string | undefined) {
  const [analysisData, setAnalysisData] = useState<Analyses | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAnalysisData() {
      if (!analysisId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Get analysis document
        const analysisRef = doc(db, "analyses", analysisId);
        const analysisDoc = await getDoc(analysisRef);

        if (!analysisDoc.exists()) {
          throw new Error("Analysis not found");
        }

        const analysisData = analysisDoc.data() as Analyses;
        setAnalysisData(analysisData);

        // Get the associated resume to display PDF
        if (analysisData.resumeId) {
          const resumeRef = doc(db, "resumes", analysisData.resumeId);
          const resumeDoc = await getDoc(resumeRef);

          if (resumeDoc.exists()) {
            const resumeData = resumeDoc.data();
            setResumeUrl(
              resumeData.fileUrl?.secureUrl ||
                resumeData.fileUrl?.publicUrl ||
                null
            );
          }
        }
      } catch (err) {
        console.error("Error fetching analysis data:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch analysis data")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysisData();
  }, [analysisId]);

  return { analysisData, resumeUrl, loading, error };
}
