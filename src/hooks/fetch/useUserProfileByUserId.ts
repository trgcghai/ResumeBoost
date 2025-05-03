import { db } from "@/lib/firebase";
import { UserProfile } from "@/type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const useUserProfileByUserId = (userId: string) => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userProfileCollectionRef = collection(db, "user_profiles");
        const q = query(
          userProfileCollectionRef,
          where("userId", "==", userId)
        );

        const dataSnap = await getDocs(q);
        if (dataSnap.empty) {
          return;
        } else {
          setData({
            ...(dataSnap.docs[0].data() as UserProfile),
            id: dataSnap.docs[0].id,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  return {
    data,
    loading,
    error,
  };
};
export default useUserProfileByUserId;
