import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

/**
 * Create a user profile with role
 * @param userId User ID
 * @param isAdmin Whether the user is an admin
 * @returns Success status and message
 */
export async function createUserProfile(
  userId: string,
  displayName: string,
  isAdmin: boolean = false
) {
  try {
    // Check if profile already exists
    const profileRef = collection(db, "user_profiles");
    const profileQuery = query(profileRef, where("userId", "==", userId));
    const profileDoc = await getDocs(profileQuery);

    // Only create if profile doesn't exist
    if (profileDoc.empty) {
      // Create user profile document
      await addDoc(profileRef, {
        userId,
        cvCount: 0,
        avgScore: 0,
        createdAt: new Date(),
        lastUploadTime: new Date(),
        updatedAt: new Date(),
        role: isAdmin ? "admin" : "user",
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
    return {
      success: false,
      message: "Error creating user profile",
      error,
    };
  }
}
