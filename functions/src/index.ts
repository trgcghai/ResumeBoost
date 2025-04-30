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
import * as userController from "./controllers/UserController";
import * as resumeController from "./controllers/ResumeController";

export const helloWorld = onCall((request) => {
  const { name } = request.data;
  logger.info("Hello logs!", { structuredData: true });
  return { data: `Hello ${name} from Firebase!` };
});

// User related functions
export const createUserProfileWithRole = onCall(
  userController.createUserProfileWithRole
);
export const setUserAsAdmin = onCall(userController.setUserAsAdmin);

export const syncUserClaims = onCall(userController.syncUserClaims);

// Resume related functions
export const processResume = onCall(
  {
    timeoutSeconds: 240, // Upload thường nhanh hơn phân tích
  },
  resumeController.processResume
);

export const analyzeResume = onCall(
  {
    timeoutSeconds: 540, // Phân tích có thể mất nhiều thời gian hơn
  },
  resumeController.analyzeResume
);
