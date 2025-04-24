/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// Initialize Firebase Admin
initializeApp();

// Get Firestore instance
const db = getFirestore();

export const helloWorld = onCall((request) => {
  const { name } = request.data;
  logger.info("Hello logs!", { structuredData: true });
  return { data: `Hello ${name} from Firebase!` };
});

export const createUserProfile = onCall(async (request) => {
  try {
    // Get userId from request data
    const { userId } = request.data;

    if (!userId) {
      throw new Error("userId is required");
    }

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
        lastUploadTime: new Date(),
        updatedAt: new Date(),
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
});
