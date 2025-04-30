import { CloudinaryUploadResult } from "../type";

/**
 * Upload file to Cloudinary
 * @param fileBase64 Base64 encoded file
 * @returns Cloudinary upload result
 */
export async function uploadToCloudinary(
  file: File | string
): Promise<CloudinaryUploadResult | null> {
  try {
    const formData = new FormData();

    // Nếu là file
    if (file instanceof File) {
      formData.append("file", file);
    }
    // Nếu là base64
    else if (typeof file === "string") {
      // Xử lý base64 data
      const base64Data = file.includes("base64,")
        ? file.split("base64,")[1]
        : file;
      formData.append("file", `data:application/pdf;base64,${base64Data}`);
    }

    // Upload preset đã được cấu hình trên Cloudinary Dashboard
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", "ResumeBoost");

    // Gọi API upload
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.log("Cloudinary upload error", error);
    return null;
  }
}

/**
 * Tạo URL cho hình ảnh từ Cloudinary
 */
export const getCloudinaryImageUrl = (
  publicId: string,
  options = {}
): string => {
  const defaultOptions = {
    secure: true,
    cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    ...options,
  };

  // Tạo URL sử dụng format: https://res.cloudinary.com/cloud_name/image/upload/options/public_id
  const transformations = Object.entries(defaultOptions)
    .filter(([key]) => !["cloud_name", "secure"].includes(key))
    .map(([key, value]) => `${key}_${value}`)
    .join(",");

  const baseUrl = `https://res.cloudinary.com/${defaultOptions.cloud_name}/image/upload`;
  const url = transformations
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;

  return url;
};

/**
 * Tạo URL cho tài liệu PDF từ Cloudinary
 */
export const getCloudinaryPdfUrl = (publicId: string): string => {
  return `https://res.cloudinary.com/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload/${publicId}.pdf`;
};
