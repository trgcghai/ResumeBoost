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

  function useDeleteProfile() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteProfile = useCallback(async (id: string) => {
      setIsDeleting(true);
      try {
        const profileRef = doc(db, "user_profiles", id);
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
    const [scoreData, setScoreData] = useState([
      { name: "Tốt", value: 0 },
      { name: "Trung bình", value: 0 },
      { name: "Kém", value: 0 },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function analyzeScores() {
        setLoading(true);
        try {
          const analyseRef = collection(db, "analyses");
          const analyseSnapshot = await getDocs(analyseRef);

          if (analyseSnapshot.empty) {
            setScoreData([
              { name: "Tốt", value: 0 },
              { name: "Trung bình", value: 0 },
              { name: "Kém", value: 0 },
            ]);
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

          // Đảm bảo tổng phần trăm là 100%
          // Nếu bị thiếu thì cộng vào phần tử có giá trị lớn nhất
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

  return {
    useResume,
    useUserProfile,
    useDeleteResume,
    useDeleteProfile,
    useUpdateUserRole,
    useOverview,
    useStatisticAnalyzeScore,
    useResumeById,
  };
}
