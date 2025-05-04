import { db } from "@/lib/firebase";
import { Resume, UserProfile } from "@/type";
import { calAvgScore } from "@/utils/callAvgScore";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  Timestamp,
  QueryConstraint,
  orderBy,
  limit,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";

export default function useFetchAdminData() {
  /**
   * Hook để lấy danh sách CV
   * @param maxResult - Số lượng CV tối đa trả về, mặc định là -1 (lấy tất cả)
   * @param getLatest - Sắp xếp theo thời gian tạo mới nhất, mặc định là false
   */
  function useResume(maxResult = -1, getLatest = false) {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchResumes() {
        setLoading(true);
        try {
          const resumesRef = collection(db, "resumes");

          const queryConstraints: QueryConstraint[] = [];

          if (getLatest) {
            queryConstraints.push(orderBy("createdAt", "desc"));
          }

          if (maxResult > 0) {
            queryConstraints.push(limit(maxResult));
          }

          const resumeQuery =
            queryConstraints.length > 0
              ? query(resumesRef, ...queryConstraints)
              : resumesRef;

          const resumeDoc = await getDocs(resumeQuery);

          const resumesData = resumeDoc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Resume[];

          setResumes(resumesData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }

      fetchResumes();
    }, [getLatest, maxResult]);

    return { resumes, loading, error };
  }

  /**
   * Hook để lấy danh sách hồ sơ người dùng
   * @param maxResult - Số lượng hồ sơ tối đa trả về, mặc định là -1 (lấy tất cả)
   * @param getLatest - Sắp xếp theo thời gian cập nhật mới nhất, mặc định là false
   */
  function useUserProfile(maxResult = -1, getLatest = false) {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchProfiles() {
        setLoading(true);
        try {
          const profileRef = collection(db, "user_profiles");

          const queryConstraints: QueryConstraint[] = [];

          if (getLatest) {
            queryConstraints.push(orderBy("createdAt", "desc"));
          }

          if (maxResult > 0) {
            queryConstraints.push(limit(maxResult));
          }

          const profileQuery =
            queryConstraints.length > 0
              ? query(profileRef, ...queryConstraints)
              : profileRef;

          const profileDocs = await getDocs(profileQuery);

          const profileData = profileDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as UserProfile[];

          setProfiles(profileData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }

      fetchProfiles();
    }, [getLatest, maxResult]);

    return { profiles, loading, error };
  }

  function useDeleteResume() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteResume = useCallback(async (id: string) => {
      setIsDeleting(true);
      try {
        const resumeRef = doc(db, "resumes", id);
        const resumeDoc = await getDoc(resumeRef);
        const resumeData = resumeDoc.data();

        const analyzeRef = collection(db, "analyses");
        const q = query(
          analyzeRef,
          where("resumeId", "==", id),
          where("userId", "==", resumeData?.user.userId)
        );
        const analyzeSnapshot = await getDocs(q);
        if (!analyzeSnapshot.empty) {
          await deleteDoc(analyzeSnapshot.docs[0].ref);
        }

        await deleteDoc(resumeRef);

        return true;
      } catch (error) {
        console.error("Error deleting resume:", error);
        setError(error as Error);
        return false;
      } finally {
        setIsDeleting(false);
      }
    }, []);

    return { deleteResume, isDeleting, error };
  }

  function useDeleteJobDescription() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteJobDescription = useCallback(async (id: string) => {
      setIsDeleting(true);
      try {
        const jobDescriptionRef = doc(db, "job_descriptions", id);
        await deleteDoc(jobDescriptionRef);
        return true;
      } catch (error) {
        console.error("Error deleting job description:", error);
        setError(error as Error);
        return false;
      } finally {
        setIsDeleting(false);
      }
    }, []);

    return { deleteJobDescription, isDeleting, error };
  }

  function useDeleteProfile() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteProfile = useCallback(async (id: string) => {
      setIsDeleting(true);
      try {
        const profileRef = doc(db, "user_profiles", id);
        const profileSnap = await getDoc(profileRef);
        if (!profileSnap.exists()) {
          throw new Error("Profile not found");
        }
        await deleteDoc(profileRef);
        return true;
      } catch (error) {
        console.error("Error deleting profile:", error);
        setError(error as Error);
        return false;
      } finally {
        setIsDeleting(false);
      }
    }, []);

    return { deleteProfile, isDeleting, error };
  }

  function useUpdateUserRole() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateUserRole = useCallback(
      async (userId: string, newRole: string) => {
        setIsUpdating(true);
        try {
          const profileRef = collection(db, "user_profiles");
          const q = query(profileRef, where("userId", "==", userId));

          const profileSnap = await getDocs(q);
          if (!profileSnap.empty) {
            await updateDoc(profileSnap.docs[0].ref, {
              role: newRole,
              updatedAt: Timestamp.fromDate(new Date()),
            });
            return true;
          }

          return false;
        } catch (error) {
          console.error("Error updating user role:", error);
          setError(error as Error);
          return false;
        } finally {
          setIsUpdating(false);
        }
      },
      []
    );

    return { updateUserRole, isUpdating, error };
  }

  function useOverview() {
    const [overviewData, setOverviewData] = useState({
      totalResumes: 0,
      totalUsers: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchOverview() {
        setLoading(true);
        try {
          const userProfilesRef = collection(db, "user_profiles");
          const userSnapshot = await getCountFromServer(userProfilesRef);
          const totalUsers = userSnapshot.data().count;

          const resumesRef = collection(db, "resumes");
          const resumeSnapshot = await getCountFromServer(resumesRef);
          const totalResumes = resumeSnapshot.data().count;

          setOverviewData({
            totalUsers,
            totalResumes,
          });
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }

      fetchOverview();
    }, []);

    return { overviewData, loading, error };
  }

  function useStatisticAnalyzeScore() {
    const [scoreData, setScoreData] = useState<
      { name: string; value: number }[] | null
    >(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function analyzeScores() {
        setLoading(true);
        try {
          const analyseRef = collection(db, "analyses");
          const analyseSnapshot = await getDocs(analyseRef);

          if (analyseSnapshot.empty) {
            setScoreData(null);
            return;
          }

          let goodCount = 0;
          let averageCount = 0;
          let poorCount = 0;

          analyseSnapshot.forEach((doc) => {
            const analyzeData = doc.data();
            const score = calAvgScore(analyzeData.scores) || 0;

            if (score > 90) {
              goodCount++;
            } else if (score >= 70 && score <= 90) {
              averageCount++;
            } else {
              poorCount++;
            }
          });

          const totalCount = analyseSnapshot.size;

          const goodPercentage = Math.round((goodCount / totalCount) * 100);
          const averagePercentage = Math.round(
            (averageCount / totalCount) * 100
          );
          const poorPercentage = Math.round((poorCount / totalCount) * 100);

          const adjustedData = [
            { name: "Tốt", value: goodPercentage },
            { name: "Trung bình", value: averagePercentage },
            { name: "Kém", value: poorPercentage },
          ];

          const totalPercentage =
            goodPercentage + averagePercentage + poorPercentage;
          if (totalPercentage !== 100 && totalCount > 0) {
            const diff = 100 - totalPercentage;
            const maxIndex = adjustedData.reduce(
              (maxIdx, item, idx, arr) =>
                item.value > arr[maxIdx].value ? idx : maxIdx,
              0
            );
            adjustedData[maxIndex].value += diff;
          }

          setScoreData(adjustedData);
        } catch (error) {
          console.error("Error analyzing CV scores:", error);
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }

      analyzeScores();
    }, []);

    return { scoreData, loading, error };
  }

  function useResumeById(id: string) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchResume() {
        setLoading(true);
        try {
          const resumeRef = doc(db, "resumes", id);
          const resumeDoc = await getDoc(resumeRef);

          if (resumeDoc.exists()) {
            setResume({ id: resumeDoc.id, ...resumeDoc.data() } as Resume);
          } else {
            setError(new Error("Resume not found"));
          }
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }

      fetchResume();
    }, [id]);

    return { resume, loading, error };
  }

  function useUpdateUserProfileStatistics() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateUserProfileStatistics = useCallback(
      async (resumeId: string) => {
        setLoading(true);
        try {
          // Lấy thông tin CV
          const resumeRef = doc(db, "resumes", resumeId);
          const resumeDoc = await getDoc(resumeRef);
          if (!resumeDoc.exists()) {
            throw new Error("Resume not found");
          }
          const resumeData = resumeDoc.data();
          const userId = resumeData.user.userId;

          console.log(userId);

          // Lấy thông tin người dùng
          const profilesRef = collection(db, "user_profiles");
          const profileQuery = query(
            profilesRef,
            where("userId", "==", resumeData.user.userId)
          );
          const profileSnap = await getDocs(profileQuery);

          if (profileSnap.empty) {
            throw new Error("User profile not found");
          }

          const profileRef = profileSnap.docs[0].ref;

          // Lấy số lượng CV của người dùng
          const resumesRef = collection(db, "resumes");
          const resumeQuery = query(
            resumesRef,
            where("user.userId", "==", userId)
          );
          const resumeSnapshot = await getCountFromServer(resumeQuery);
          const cvCount = resumeSnapshot.data().count;

          let avgScore = 0;
          let totalAnalyses = 0;

          const resumesWithAnalysisQuery = query(
            resumesRef,
            where("user.userId", "==", userId),
            where("analysisId", "!=", null)
          );
          const resumesWithAnalysisSnap = await getDocs(
            resumesWithAnalysisQuery
          );

          if (!resumesWithAnalysisSnap.empty) {
            let totalScore = 0;

            // Lấy tất cả analysisId
            const analysisIds = resumesWithAnalysisSnap.docs
              .map((doc) => doc.data().analysisId)
              .filter(Boolean);

            // Lấy thông tin phân tích
            for (const analysisId of analysisIds) {
              const analysisRef = doc(db, "analyses", analysisId);
              const analysisSnap = await getDoc(analysisRef);

              if (analysisSnap.exists()) {
                const analyzeData = analysisSnap.data();
                const score = calAvgScore(analyzeData.scores) || 0;

                totalScore += score;
                totalAnalyses++;
              }
            }

            // Tính điểm trung bình
            avgScore = totalAnalyses > 0 ? totalScore / totalAnalyses : 0;
          }

          await updateDoc(profileRef, {
            cvCount,
            avgScore,
            updatedAt: Timestamp.fromDate(new Date()),
          });

          return true;
        } catch (error) {
          console.error("Error updating user profile statistics:", error);
          setError(error as Error);
          return false;
        } finally {
          setLoading(false);
        }
      },
      []
    );

    return { updateUserProfileStatistics, loading, error };
  }

  return {
    useResume,
    useUserProfile,
    useDeleteResume,
    useDeleteProfile,
    useUpdateUserRole,
    useOverview,
    useStatisticAnalyzeScore,
    useResumeById,
    useDeleteJobDescription,
    useUpdateUserProfileStatistics,
  };
}
