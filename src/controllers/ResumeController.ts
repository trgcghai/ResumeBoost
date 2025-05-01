import { updateUserProfileStats } from "../services/UserServices";
import { callGeminiApi } from "../services/callGeminiApi";
import { ResumeAnalysisResult } from "../type";
import { uploadToCloudinary } from "../services/CloudinaryService";
import { auth, db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Process resume controller - xử lý upload và lưu thông tin
 */
export async function processResume({
  fileBase64,
  fileName,
  jobDescription,
}: {
  fileBase64: string;
  fileName: string;
  jobDescription: string;
}) {
  try {
    if (!fileBase64 || !fileName || !jobDescription) {
      return {
        success: false,
        message: "Missing file data or job description",
      };
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log("User not authenticated");
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const uploadResult = await uploadToCloudinary(fileBase64);
    console.log({ uploadResult });

    if (!uploadResult || !uploadResult.public_id) {
      console.log("Cloudinary upload failed or returned incomplete data");
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

    let resumeRef;
    try {
      resumeRef = doc(collection(db, "resumes"));
      await setDoc(resumeRef, resumeObject);
    } catch (firestoreError) {
      console.log("Error creating resume document:", firestoreError);
      throw new Error(`Failed to create resume document: ${firestoreError}`);
    }

    // save jobdescription to firestore
    const jobDescriptionObject = {
      userId,
      content: jobDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let jobDescriptionRef;
    try {
      jobDescriptionRef = doc(collection(db, "job_descriptions"));
      await setDoc(jobDescriptionRef, jobDescriptionObject);
    } catch (firestoreError) {
      console.log("Error creating job description document:", firestoreError);
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
          id: resumeRef.id,
        },
        createJobDescriptionResult: {
          id: jobDescriptionRef.id,
        },
      },
    };
  } catch (error) {
    console.log("Error processing resume", error);
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
export async function analyzeResume({
  resumeId,
  jobDescriptionId,
}: {
  resumeId: string;
  jobDescriptionId: string;
}) {
  try {
    if (!resumeId || !jobDescriptionId) {
      return {
        success: false,
        message: "resumeId and jobDescriptionId are required",
      };
    }

    const userId = auth.currentUser?.uid;

    if (!userId) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    // 1. Lấy thông tin resume từ Firestore
    const resumeDoc = await getDoc(doc(db, "resumes", resumeId));
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
    const jobDescriptionDoc = await getDoc(
      doc(db, "job_descriptions", jobDescriptionId)
    );
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

    console.log({ jobDescriptionData, resumeData }, { structuredData: true });

    // 3. Gọi Gemini API để phân tích CV
    const analysisResponse: ResumeAnalysisResult = await callGeminiApi(
      resumeData,
      jobDescriptionData.content
    );

    // 4. Lưu kết quả phân tích vào Firestore
    const analysisRef = doc(collection(db, "analyses"));
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

    await setDoc(analysisRef, analysisObject);

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
    console.log("Error analyzing resume", error);
    return {
      success: false,
      message: `Error analyzing resume: ${error}`,
      error,
    };
  }
}
