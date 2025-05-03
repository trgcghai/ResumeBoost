import { useState, useCallback } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/services/CloudinaryService";

interface ProcessResumeParams {
  fileBase64: string;
  fileName: string;
  jobDescription: string;
}

interface ProcessResumeResult {
  success: boolean;
  message: string;
  result?: {
    uploadResult: {
      asset_folder?: string;
      asset_id?: string;
      created_at?: string;
      display_name?: string;
      bytes?: number;
      format?: string;
      height?: number;
      width?: number;
      public_id?: string;
      resource_type?: string;
      url?: string;
    };
    createResumeResult: { id: string };
    createJobDescriptionResult: { id: string };
  };
  error?: string;
}

const useProcessResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<ProcessResumeResult | null>(null);

  const processResume = useCallback(
    async ({
      fileBase64,
      fileName,
      jobDescription,
    }: ProcessResumeParams): Promise<ProcessResumeResult> => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        if (!fileBase64 || !fileName || !jobDescription) {
          const error = new Error("Missing file data or job description");
          setError(error);
          return {
            success: false,
            message: error.message,
          };
        }

        const { uid, displayName } = auth.currentUser!;
        if (!uid) {
          const error = new Error("Authentication required");
          setError(error);
          console.log("User not authenticated");
          return {
            success: false,
            message: error.message,
          };
        }

        const uploadResult = await uploadToCloudinary(fileBase64);
        console.log({ uploadResult });

        if (!uploadResult || !uploadResult.public_id) {
          const error = new Error("Failed to upload file to Cloudinary");
          setError(error);
          console.log("Cloudinary upload failed or returned incomplete data");
          return {
            success: false,
            message: error.message,
          };
        }

        // Save the upload result to Firestore
        const fileUrl = {
          secureUrl: uploadResult?.secure_url,
          publicUrl: uploadResult?.url,
        };

        const resumeObject = {
          user: { userId: uid, username: displayName },
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
          throw new Error(
            `Failed to create resume document: ${firestoreError}`
          );
        }

        // save jobdescription to firestore
        const jobDescriptionObject = {
          userId: uid,
          content: jobDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        let jobDescriptionRef;
        try {
          jobDescriptionRef = doc(collection(db, "job_descriptions"));
          await setDoc(jobDescriptionRef, jobDescriptionObject);
        } catch (firestoreError) {
          console.log(
            "Error creating job description document:",
            firestoreError
          );
          throw new Error(
            `Failed to create job description document: ${firestoreError}`
          );
        }

        const processResult = {
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

        setResult(processResult);
        return processResult;
      } catch (error) {
        console.log("Error processing resume", error);
        const err = error as Error;
        setError(err);

        return {
          success: false,
          message: "Error processing resume",
          error: err.toString(),
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    processResume,
    loading,
    error,
    result,
  };
};

export default useProcessResume;
