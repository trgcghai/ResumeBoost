import { useState } from "react";

export type CV = {
  _id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
};

// Data mẫu ban đầu
const initialCvs: CV[] = [
  {
    _id: "1",
    userId: "user1",
    fileName: "Frontend Developer CV",
    fileUrl: "https://example.com/cv1.pdf",
    fileType: "pdf",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    userId: "user2",
    fileName: "UX Designer Resume",
    fileUrl: "https://example.com/cv2.pdf",
    fileType: "pdf",
    createdAt: "2024-01-14T09:30:00Z",
    updatedAt: "2024-01-14T09:30:00Z",
  },
];

export const useCvManagement = (initialData = initialCvs) => {
  const [data, setData] = useState<CV[]>(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (cvId: string) => {
    const updatedCvs = data.filter((cv) => cv._id !== cvId);
    setData(updatedCvs);
    setIsDialogOpen(false);
    return data.find((cv) => cv._id === cvId);
  };

  return {
    data,
    setData,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  };
};

export default useCvManagement;
