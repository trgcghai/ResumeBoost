import { db } from "@/lib/firebase";
import { Resume, UserProfile } from "@/type";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchAdminData() {
  function useResume() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchResumes() {
        setLoading(true);
        try {
          const resumesRef = collection(db, "resumes");
          const resumeDoc = await getDocs(resumesRef);

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
    }, []);

    return { resumes, loading, error };
  }

  function useUserProfile() {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function fetchResumes() {
        setLoading(true);
        try {
          const profileRef = collection(db, "user_profiles");
          const profileDocs = await getDocs(profileRef);

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

      fetchResumes();
    }, []);

    return { profiles, loading, error };
  }

  return { useResume, useUserProfile };
}
