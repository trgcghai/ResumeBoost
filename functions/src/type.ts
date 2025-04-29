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
    | {};
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
