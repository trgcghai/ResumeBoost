import { Resume } from "@/type";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export const useCvManagement = (initialData: Resume[] | [] = []) => {
  const [data, setData] = useState<Resume[]>(initialData);
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
    const updatedCvs = data.filter((cv) => cv.id !== cvId);
    setData(updatedCvs);
    setIsDialogOpen(false);
    return data.find((cv) => cv.id === cvId);
  };

  const formatDate = (dateString: Timestamp) => {
    return format(dateString.toDate(), "HH:mm dd/MM/yyyy");
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

export default useCvManagement;
