import { useState, useCallback } from "react";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { ResumeAnalysisResult } from "@/type";
import { callGeminiApi } from "@/services/callGeminiApi";
import useFetchAdminData from "./useFetchAdminData";

interface AnalyzeResumeParams {
  resumeId: string;
  jobDescriptionId: string;
}

interface AnalyzeResumeResult {
  success: boolean;
  message: string;
  result?: {
    resumeId: string;
    analysisId: string;
    analysisResult: ResumeAnalysisResult;
  };
  error?: Error;
}

const useAnalyzeResume = () => {
  const { useUpdateUserProfileStatistics } = useFetchAdminData();
  const { updateUserProfileStatistics } = useUpdateUserProfileStatistics();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<{
    resumeId: string;
    analysisId: string;
    analysisResult: ResumeAnalysisResult;
  } | null>(null);

  const analyzeResume = useCallback(
    async ({
      resumeId,
      jobDescriptionId,
    }: AnalyzeResumeParams): Promise<AnalyzeResumeResult> => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        if (!resumeId || !jobDescriptionId) {
          const error = new Error("resumeId and jobDescriptionId are required");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        const userId = auth.currentUser?.uid;

        if (!userId) {
          const error = new Error("Authentication required");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        // 1. Lấy thông tin resume từ Firestore
        const resumeDoc = await getDoc(doc(db, "resumes", resumeId));
        if (!resumeDoc.exists()) {
          const error = new Error("Resume not found");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        const resumeData = resumeDoc.data();
        if (!resumeData) {
          const error = new Error("Resume data is empty");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        // 2. Lấy thông tin job description từ Firestore
        const jobDescriptionDoc = await getDoc(
          doc(db, "job_descriptions", jobDescriptionId)
        );
        if (!jobDescriptionDoc.exists()) {
          const error = new Error("Job description not found");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        const jobDescriptionData = jobDescriptionDoc.data();
        if (!jobDescriptionData) {
          const error = new Error("Job description data is empty");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        // 3. Gọi Gemini API để phân tích CV
        const analysisResponse: ResumeAnalysisResult = await callGeminiApi(
          resumeData,
          jobDescriptionData.content
        );

        // 4. Lưu kết quả phân tích vào Firestore
        const analysisRef = doc(collection(db, "analyses"));
        const analysisObject = {
          userId,
          resumeId: resumeId,
          jobDescriptionId: jobDescriptionId,

          scores:
            "scores" in analysisResponse.analysis
              ? analysisResponse.analysis.scores
              : null,
          skills:
            "skills" in analysisResponse.analysis
              ? analysisResponse.analysis.skills
              : null,
          analysis:
            "analysis" in analysisResponse.analysis
              ? analysisResponse.analysis.analysis
              : null,
          suggestions:
            "suggestions" in analysisResponse.analysis
              ? analysisResponse.analysis.suggestions
              : null,

          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(analysisRef, analysisObject);

        // 5. Cập nhật thống kê người dùng sử dụng hook mới
        // Hook này nhận vào resumeId để tính toán lại tất cả thống kê
        await updateUserProfileStatistics(resumeId);

        // 6. Cập nhật resumeData để thêm analysisId
        await setDoc(
          doc(db, "resumes", resumeId),
          {
            analysisId: analysisRef.id,
            lastAnalyzed: new Date(),
          },
          { merge: true }
        );

        const resultData = {
          resumeId,
          analysisId: analysisRef.id,
          analysisResult: analysisResponse.analysis as ResumeAnalysisResult,
        };

        setResult(resultData);

        return {
          success: true,
          message: "Resume analyzed successfully",
          result: resultData,
        };
      } catch (error) {
        console.log("Error analyzing resume", error);
        setError(error as Error);
        return {
          success: false,
          message: `Error analyzing resume: ${error}`,
          error: error as Error,
        };
      } finally {
        setLoading(false);
      }
    },
    [updateUserProfileStatistics]
  );

  return {
    loading,
    error,
    result,
    analyzeResume,
  };
};
export default useAnalyzeResume;
