import { CallableRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { db } from "../config/firebase";
import { updateUserProfileStats } from "../services/UserServices";
import { callGeminiApi } from "../services/callGeminiApi";
import { ResumeAnalysisResult } from "../type";
import { uploadToCloudinary } from "../services/CloudinaryService";

/**
 * Process resume controller - xử lý upload và lưu thông tin
 */
export async function processResume(request: CallableRequest) {
  try {
    const { fileBase64, fileName, jobDescription } = request.data;

    if (!fileBase64 || !fileName || !jobDescription) {
      return {
        success: false,
        message: "Missing file data or job description",
      };
    }

    const userId = request.auth?.uid;
    if (!userId) {
      logger.error("User not authenticated");
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const uploadResult = await uploadToCloudinary(fileBase64);
    logger.info({ uploadResult });

    if (!uploadResult || !uploadResult.public_id) {
      logger.error("Cloudinary upload failed or returned incomplete data");
      return {
        success: false,
        message: "Failed to upload file to Cloudinary",
      };
    }

    // Save the upload result to Firestore
    const fileUrl = {
      secureUrl: uploadResult?.secure_url,
      publicUrl: uploadResult?.url,
    };
    const resumeObject = {
      userId,
      fileName,
      fileUrl,
      asset_folder: uploadResult?.asset_folder,
      asset_id: uploadResult?.asset_id,
      bytes: uploadResult?.bytes,
      format: uploadResult?.format,
      height: uploadResult?.height,
      width: uploadResult?.width,
      public_id: uploadResult?.public_id,
      resource_type: uploadResult?.resource_type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let createResumeResult, resumeRef;
    try {
      resumeRef = db.collection("resumes").doc();
      createResumeResult = await resumeRef.set(resumeObject);
    } catch (firestoreError) {
      logger.error("Error creating resume document:", firestoreError);
      throw new Error(`Failed to create resume document: ${firestoreError}`);
    }

    // save jobdescription to firestore
    const jobDescriptionObject = {
      userId,
      content: jobDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let createJobDescriptionResult, jobDescriptionRef;
    try {
      jobDescriptionRef = db.collection("job_descriptions").doc();
      createJobDescriptionResult = await jobDescriptionRef.set(
        jobDescriptionObject
      );
    } catch (firestoreError) {
      logger.error("Error creating job description document:", firestoreError);
      throw new Error(
        `Failed to create job description document: ${firestoreError}`
      );
    }

    return {
      success: true,
      message: "File processed successfully",
      result: {
        uploadResult: {
          asset_folder: uploadResult?.asset_folder,
          asset_id: uploadResult?.asset_id,
          created_at: uploadResult?.created_at,
          display_name: uploadResult?.display_name,
          bytes: uploadResult?.bytes,
          format: uploadResult?.format,
          height: uploadResult?.height,
          width: uploadResult?.width,
          public_id: uploadResult?.public_id,
          resource_type: uploadResult?.resource_type,
          url: uploadResult?.url,
        },
        createResumeResult: {
          ...createResumeResult,
          id: resumeRef.id,
        },
        createJobDescriptionResult: {
          ...createJobDescriptionResult,
          id: jobDescriptionRef.id,
        },
      },
    };
  } catch (error) {
    logger.error("Error processing resume", error);
    return {
      success: false,
      message: "Error processing resume",
      error: (error as Error).toString(),
    };
  }
}

/**
 * Controller gọi Gemini API để phân tích CV
 * Cần truyền resumeId và jobDescriptionId để xác định CV và job description cần phân tích
 */
export async function analyzeResume(request: CallableRequest) {
  try {
    const { resumeId, jobDescriptionId } = request.data;

    if (!resumeId || !jobDescriptionId) {
      return {
        success: false,
        message: "resumeId and jobDescriptionId are required",
      };
    }

    const userId = request.auth?.uid;

    if (!userId) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    // 1. Lấy thông tin resume từ Firestore
    const resumeDoc = await db.collection("resumes").doc(resumeId).get();
    if (!resumeDoc.exists) {
      return {
        success: false,
        message: "Resume not found",
      };
    }

    const resumeData = resumeDoc.data();
    if (!resumeData) {
      return {
        success: false,
        message: "Resume data is empty",
      };
    }

    // 2. Lấy thông tin job description từ Firestore
    const jobDescriptionDoc = await db
      .collection("job_descriptions")
      .doc(jobDescriptionId)
      .get();
    if (!jobDescriptionDoc.exists) {
      return {
        success: false,
        message: "Job description not found",
      };
    }

    const jobDescriptionData = jobDescriptionDoc.data();
    if (!jobDescriptionData) {
      return {
        success: false,
        message: "Job description data is empty",
      };
    }

    logger.log({ jobDescriptionData, resumeData }, { structuredData: true });

    // 3. Gọi Gemini API để phân tích CV
    const analysisResponse: ResumeAnalysisResult = await callGeminiApi(
      resumeData,
      jobDescriptionData.content
    );

    // 4. Lưu kết quả phân tích vào Firestore
    const analysisRef = db.collection("analyses").doc();
    const analysisObject = {
      userId,
      resumeId: resumeId,
      jobDescriptionId: jobDescriptionId,

      scores:
        "scores" in analysisResponse.analysis
          ? analysisResponse.analysis.scores
          : null,
      skills:
        "skills" in analysisResponse.analysis
          ? analysisResponse.analysis.skills
          : null,
      analysis:
        "analysis" in analysisResponse.analysis
          ? analysisResponse.analysis.analysis
          : null,
      suggestions:
        "suggestions" in analysisResponse.analysis
          ? analysisResponse.analysis.suggestions
          : null,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await analysisRef.set(analysisObject);

    // 5. Cập nhật thông tin người dùng
    if (
      typeof analysisResponse.analysis === "object" &&
      "scores" in analysisResponse.analysis
    ) {
      await updateUserProfileStats(userId, analysisResponse.analysis.scores);
    }

    return {
      success: true,
      message: "Resume analyzed successfully",
      result: {
        resumeId,
        analysisId: analysisRef.id,
        analysisResult: analysisResponse.analysis,
      },
    };
  } catch (error) {
    logger.error("Error analyzing resume", error);
    return {
      success: false,
      message: `Error analyzing resume: ${error}`,
      error,
    };
  }
}
