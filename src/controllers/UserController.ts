import * as userService from "../services/UserServices";

/**
 * Create user profile with role controller
 */
export async function createUserProfileWithRole({
  userId,
  displayName,
  isAdmin = false,
}: {
  userId: string;
  displayName: string;
  isAdmin?: boolean;
}) {
  if (!userId) {
    return { success: false, message: "userId is required" };
  }

  return await userService.createUserProfile(userId, displayName, isAdmin);
}
