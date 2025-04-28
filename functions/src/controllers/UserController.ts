import { CallableRequest } from "firebase-functions/v2/https";
import * as userService from "../services/UserServices";
import { auth, db } from "../config/firebase";
import { logger } from "firebase-functions";

/**
 * Create user profile with role controller
 */
export async function createUserProfileWithRole(request: CallableRequest) {
  const { userId, isAdmin = false } = request.data;

  if (!userId) {
    return { success: false, message: "userId is required" };
  }

  return await userService.createUserProfile(userId, isAdmin);
}

/**
 * Set user as admin controller
 */
export async function setUserAsAdmin(request: CallableRequest) {
  const { targetUserId } = request.data;
  const callerUid = request.auth?.uid;

  if (!callerUid) {
    return { success: false, message: "Authentication required" };
  }

  if (!targetUserId) {
    return { success: false, message: "targetUserId is required" };
  }

  return await userService.setUserAsAdmin(targetUserId, callerUid);
}

/**
 * Đồng bộ hóa custom claims với dữ liệu trong Firestore
 */
export async function syncUserClaims(request: CallableRequest) {
  try {
    const { userId } = request.data;

    if (!userId) {
      return { success: false, message: "userId is required" };
    }

    // Kiểm tra quyền truy cập - chỉ cho phép người dùng đồng bộ thông tin của chính họ hoặc admin
    const callerUid = request.auth?.uid;

    if (!callerUid) {
      return { success: false, message: "Authentication required" };
    }

    // Nếu không phải chính người dùng, kiểm tra xem người gọi có phải là admin
    if (callerUid !== userId) {
      const callerUserRecord = await auth.getUser(callerUid);
      const callerClaims = callerUserRecord.customClaims || {};

      if (!callerClaims.admin) {
        return { success: false, message: "Permission denied" };
      }
    }

    // Lấy thông tin người dùng từ Firestore
    const userProfileRef = db.collection("user_profiles").doc(userId);
    const userProfileSnap = await userProfileRef.get();

    if (!userProfileSnap.exists) {
      return { success: false, message: "User profile not found" };
    }

    const userData = userProfileSnap.data();
    const role = userData?.role || "user";
    const isAdmin = role === "admin";

    // Cập nhật custom claims
    await auth.setCustomUserClaims(userId, {
      admin: isAdmin,
      role: role,
    });

    // Trả về kết quả thành công
    return {
      success: true,
      message: "Custom claims synchronized successfully",
      role: role,
      isAdmin: isAdmin,
    };
  } catch (error) {
    logger.error("Error synchronizing custom claims", error);
    return {
      success: false,
      message: "Failed to synchronize custom claims",
      error,
    };
  }
}
