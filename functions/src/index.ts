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
import { getAuth } from "firebase-admin/auth";
import { v2 as cloudinary } from "cloudinary";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// Initialize Firebase Admin
initializeApp();

// Get Firestore instance
const db = getFirestore();
// Get Auth instance
const auth = getAuth();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dthvciqeu",
  api_key: process.env.CLOUDINARY_API_KEY || "784973211484813",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "xUCqcqZzL-MXXHS9drIsaZ4q5LU",
});

export const helloWorld = onCall((request) => {
  const { name } = request.data;
  logger.info("Hello logs!", { structuredData: true });
  return { data: `Hello ${name} from Firebase!` };
});

export const createUserProfileWithRole = onCall(async (request) => {
  try {
    // Get userId from request data
    const { userId, isAdmin = false } = request.data;

    if (!userId) {
      throw new Error("userId is required");
    }

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
});

// Function to set a user as admin (should be protected and only callable by admins)
export const setUserAsAdmin = onCall(async (request) => {
  try {
    const { targetUserId } = request.data;
    const callerUid = request.auth?.uid;

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
});

export const processResume = onCall(async (request) => {
  try {
    const { fileBase64, fileName, fileType, jobDescription } = request.data;

    if (!fileBase64 || !fileName || !fileType || !jobDescription) {
      return {
        success: false,
        message: "Missing file data or job description",
      };
    }

    logger.info(
      `check cloudinary config ${process.env.CLOUDINARY_CLOUD_NAME} ${process.env.CLOUDINARY_API_KEY} ${process.env.CLOUDINARY_API_SECRET}`
    );

    const uploadResult = await uploadToCloudinary(fileBase64);
    logger.info(`File uploaded to Cloudinary: ${uploadResult}`, {
      structuredData: true,
    });

    return {
      success: true,
      message: "File processed successfully",
      result: uploadResult,
    };
  } catch (error) {
    // logger.error("Error processing resume", error);
    return {
      success: false,
      message: "Error processing resume",
      error,
    };
  }
});

async function uploadToCloudinary(fileBase64: string) {
  try {
    // Loại bỏ header của base64 nếu có
    const base64Data = fileBase64.includes("base64,")
      ? fileBase64.split("base64,")[1]
      : fileBase64;

    // Upload file lên Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${base64Data}`,
      {
        resource_type: "auto",
        folder: "ResumeBoost",
      }
    );

    return result;
  } catch (error) {
    logger.error("Cloudinary upload error", error);
    return null;
  }
}
