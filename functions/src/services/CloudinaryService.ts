import cloudinary from "../config/cloudinary";
import * as logger from "firebase-functions/logger";
import { CloudinaryUploadResult } from "../type";

/**
 * Upload file to Cloudinary
 * @param fileBase64 Base64 encoded file
 * @returns Cloudinary upload result
 */
export async function uploadToCloudinary(
  fileBase64: string
): Promise<CloudinaryUploadResult | null> {
  try {
    // Remove base64 header if present
    const base64Data = fileBase64.includes("base64,")
      ? fileBase64.split("base64,")[1]
      : fileBase64;

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${base64Data}`,
      {
        resource_type: "auto",
        folder: "ResumeBoost",
        upload_preset: "resumeboost",
      }
    );

    return result;
  } catch (error) {
    logger.error("Cloudinary upload error", error);
    return null;
  }
}
