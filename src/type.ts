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
