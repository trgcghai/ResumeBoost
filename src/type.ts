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
  suggqestions: string[];
}
