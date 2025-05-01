import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  avgScore: number;
  createdAt: Timestamp;
  cvCount: number;
  id: string;
  lastUploadTime: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

export interface Resume {
  id: string;
  asset_folder: string;
  asset_id: string;
  bytes: number;
  createdAt: Timestamp;
  fileName: string;
  fileUrl: {
    publicUrl: string;
    secureUrl: string;
  };
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  updatedAt: Timestamp;
  userId: string;
  width: number;
}

export interface JobDescription {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  content: string;
}

export interface Analyses {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  resumeId: string;
  jobDescriptionId: string;
  analysis: {
    strengths: string[];
    weaknesses: string[];
  };
  scores: {
    format: number;
    keywords: number;
    relevance: number;
    overall: number;
  };
  fileUrl: {
    publicUrl: string;
    secureUrl: string;
  };
  skills: {
    keywordsToAdd: string[];
    missing: string[];
    present: string[];
  };
  suggestions: string[];
}

export interface CardData {
  resumeId: string;
  analysisId: string;
  title: string;
  uploadTime: Timestamp;
  avgScore: number;
}

export interface ResumeAnalysisResult {
  success: boolean;
  message: string;
  analysis:
    | {
        skills: {
          present: string[];
          missing: string[];
          keywordsToAdd: string[];
        };
        scores: {
          format: number;
          keywords: number;
          relevance: number;
          overall: number;
        };
        analysis: {
          strengths: string[];
          weaknesses: string[];
        };
        suggestions: string[];
      }
    | object;
}

export interface NormalizedResult {
  skills: {
    present: string[];
    missing: string[];
    keywordsToAdd: string[];
  };
  scores: {
    overall: number;
    format: number;
    keywords: number;
    relevance: number;
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
  };
  suggestions: string[];
}

export interface CloudinaryUploadResult {
  asset_folder?: string;
  asset_id?: string;
  created_at?: string;
  display_name?: string;
  bytes?: number;
  format?: string;
  height?: number;
  width?: number;
  pages?: number;
  public_id?: string;
  resource_type?: string;
  secure_url?: string;
  url?: string;
}

export interface ResumeObject {
  userId: string;
  fileName: string;
  fileType: string;
  fileUrl: {
    secureUrl?: string;
    publicUrl?: string;
  };
  cloudinaryPublicId?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  analysisId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResult?: any;
}

export interface JobDescriptionObject {
  userId: string;
  content: string;
  resumeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileObject {
  userId: string;
  cvCount: number;
  avgScore: number;
  createdAt: Date;
  lastUploadTime: Date;
  updatedAt: Date;
  role: string;
}
