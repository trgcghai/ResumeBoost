import * as userService from "../services/UserServices";

/**
 * Create user profile with role controller
 */
export async function createUserProfileWithRole({
  userId,
  isAdmin = false,
}: {
  userId: string;
  isAdmin?: boolean;
}) {
  if (!userId) {
    return { success: false, message: "userId is required" };
  }

  return await userService.createUserProfile(userId, isAdmin);
}
