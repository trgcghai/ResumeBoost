import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

/**
 * Update user profile with new CV data
 * @param userId User ID
 * @param overallScore Overall score of the CV
 * @returns Success status
 */
export async function updateUserProfileStats(
  userId: string,
  scores: {
    format: number;
    keywords: number;
    relevance: number;
    overall: number;
  }
) {
  try {
    const userRef = collection(db, "user_profiles");
    const userQuery = query(userRef, where("userId", "==", userId));
    const userDoc = await getDocs(userQuery);

    if (userDoc.empty) {
      console.log(`User profile not found for ${userId}`);
      return false;
    }

    const userData = userDoc.docs[0].data();
    if (!userData) return false;

    const currentCvCount = userData.cvCount || 0;
    const currentTotalScore = (userData.avgScore || 0) * currentCvCount;

    const newAvgScore = Math.round(
      (currentTotalScore + calAvgScore(scores)) / (currentCvCount + 1)
    );

    await updateDoc(userDoc.docs[0].ref, {
      cvCount: currentCvCount + 1,
      avgScore: newAvgScore,
      lastUploadTime: new Date(),
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.log("Error updating user profile stats", error);
    return false;
  }
}

function calAvgScore(scores: {
  format: number;
  keywords: number;
  relevance: number;
  overall: number;
}) {
  return Math.round(
    (scores.format + scores.keywords + scores.relevance + scores.overall) / 4
  );
}
