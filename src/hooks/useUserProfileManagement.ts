import { useState } from "react";

export type UserProfile = {
  _id: string;
  userId: string;
  cvCount: number;
  avgScore: number;
  lastUploadTime: string;
  updatedAt: string;
};

// Data mẫu ban đầu
const initialProfiles: UserProfile[] = [
  {
    _id: "1",
    userId: "user_001",
    cvCount: 5,
    avgScore: 82.5,
    lastUploadTime: "2025-04-28T10:30:00Z",
    updatedAt: "2025-04-28T10:35:00Z",
  },
  {
    _id: "2",
    userId: "user_002",
    cvCount: 3,
    avgScore: 75.0,
    lastUploadTime: "2025-04-27T09:15:00Z",
    updatedAt: "2025-04-27T09:20:00Z",
  },
  {
    _id: "3",
    userId: "user_003",
    cvCount: 7,
    avgScore: 88.3,
    lastUploadTime: "2025-04-26T14:45:00Z",
    updatedAt: "2025-04-26T14:50:00Z",
  },
  {
    _id: "4",
    userId: "user_004",
    cvCount: 2,
    avgScore: 65.0,
    lastUploadTime: "2025-04-25T11:20:00Z",
    updatedAt: "2025-04-25T11:25:00Z",
  },
  {
    _id: "5",
    userId: "user_005",
    cvCount: 4,
    avgScore: 79.5,
    lastUploadTime: "2025-04-24T15:10:00Z",
    updatedAt: "2025-04-24T15:15:00Z",
  },
  {
    _id: "6",
    userId: "user_006",
    cvCount: 6,
    avgScore: 91.2,
    lastUploadTime: "2025-04-23T09:45:00Z",
    updatedAt: "2025-04-23T09:50:00Z",
  },
  {
    _id: "7",
    userId: "user_007",
    cvCount: 1,
    avgScore: 60.0,
    lastUploadTime: "2025-04-22T14:30:00Z",
    updatedAt: "2025-04-22T14:35:00Z",
  },
];

export const useUserProfileManagement = (initialData = initialProfiles) => {
  const [data, setData] = useState<UserProfile[]>(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (userId: string) => {
    const userToDelete = data.find((user) => user._id === userId);
    const updatedUsers = data.filter((user) => user._id !== userId);
    setData(updatedUsers);
    setIsDialogOpen(false);
    return userToDelete;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    data,
    setData,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    formatDate,
  };
};

export default useUserProfileManagement;
