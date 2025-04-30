import { logger } from "firebase-functions";
import { auth, db } from "../config/firebase";

/**
 * Create a user profile with role
 * @param userId User ID
 * @param isAdmin Whether the user is an admin
 * @returns Success status and message
 */
export async function createUserProfile(
  userId: string,
  isAdmin: boolean = false
) {
  try {
    await auth.setCustomUserClaims(userId, {
      admin: isAdmin,
      role: isAdmin ? "admin" : "user",
    });

    // Check if profile already exists
    const profileRef = db.collection("user_profiles").doc(userId);
    const profileDoc = await profileRef.get();

    // Only create if profile doesn't exist
    if (!profileDoc.exists) {
      // Create user profile document
      await profileRef.set({
        userId,
        cvCount: 0,
        avgScore: 0,
        createdAt: new Date(),
        lastUploadTime: new Date(),
        updatedAt: new Date(),
        role: isAdmin ? "admin" : "user",
      });

      logger.info(`User profile created for ${userId}`, {
        structuredData: true,
      });
      return { success: true, message: "User profile created successfully" };
    } else {
      logger.info(`Profile already exists for ${userId}`, {
        structuredData: true,
      });
      return { success: true, message: "User profile already exists" };
    }
  } catch (error) {
    logger.error("Error creating user profile", error);
    return {
      success: false,
      message: "Error creating user profile",
      error,
    };
  }
}

/**
 * Set a user as admin
 * @param targetUserId User ID to set as admin
 * @param callerUid User ID of the caller
 * @returns Success status and message
 */
export const setUserAsAdmin = async (
  targetUserId: string,
  callerUid: string
) => {
  try {
    // Security check - ensure caller is admin
    if (!callerUid) {
      throw new Error("Authentication required");
    }

    const callerUserRecord = await auth.getUser(callerUid);
    const customClaims = callerUserRecord.customClaims || {};

    if (!customClaims.admin) {
      throw new Error("Admin privileges required");
    }

    // Set the target user as admin
    await auth.setCustomUserClaims(targetUserId, {
      admin: true,
      role: "admin",
    });

    // Update Firestore profile
    await db.collection("user_profiles").doc(targetUserId).update({
      role: "admin",
      updatedAt: new Date(),
    });

    return { success: true, message: "User set as admin successfully" };
  } catch (error) {
    logger.error("Error setting user as admin", error);
    return {
      success: false,
      message: "Failed to set user as admin",
      error,
    };
  }
};

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
    const userRef = db.collection("user_profiles").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      logger.warn(`User profile not found for ${userId}`);
      return false;
    }

    const userData = userDoc.data();
    if (!userData) return false;

    const currentCvCount = userData.cvCount || 0;
    const currentTotalScore = (userData.avgScore || 0) * currentCvCount;

    const newAvgScore = Math.round(
      (currentTotalScore + calAvgScore(scores)) / (currentCvCount + 1)
    );

    await userRef.update({
      cvCount: currentCvCount + 1,
      avgScore: newAvgScore,
      lastUploadTime: new Date(),
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    logger.error("Error updating user profile stats", error);
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
