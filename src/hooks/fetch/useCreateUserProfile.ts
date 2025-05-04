import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

const useCreateUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createUserProfile(userId: string, displayName: string) {
    setLoading(true);
    try {
      const profileRef = collection(db, "user_profiles");
      const profileQuery = query(profileRef, where("userId", "==", userId));
      const profileDoc = await getDocs(profileQuery);

      if (profileDoc.empty) {
        await addDoc(profileRef, {
          userId,
          cvCount: 0,
          avgScore: 0,
          createdAt: new Date(),
          lastUploadTime: new Date(),
          updatedAt: new Date(),
          role: "user",
          username: displayName,
        });

        console.log(`User profile created for ${userId}`, {
          structuredData: true,
        });
        return { success: true, message: "User profile created successfully" };
      } else {
        console.log(`Profile already exists for ${userId}`, {
          structuredData: true,
        });
        return { success: true, message: "User profile already exists" };
      }
    } catch (error) {
      console.log("Error creating user profile", error);
      setError(error as Error);
      return {
        success: false,
        message: "Error creating user profile",
        error,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    createUserProfile,
    loading,
    error,
  };
};
export default useCreateUserProfile;
