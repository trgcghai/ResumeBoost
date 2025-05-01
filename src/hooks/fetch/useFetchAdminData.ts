import { db } from "@/lib/firebase";
import { Resume, UserProfile } from "@/type";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";

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
      async function fetchProfiles() {
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

      fetchProfiles();
    }, []);

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

  return { useResume, useUserProfile, useDeleteResume, useDeleteProfile };
}
