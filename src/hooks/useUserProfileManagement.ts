import { UserProfile } from "@/type";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export const useUserProfileManagement = (
  initialData: UserProfile[] | [] = []
) => {
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
    const userToDelete = data.find((user) => user.id === userId);
    const updatedUsers = data.filter((user) => user.id !== userId);
    setData(updatedUsers);
    setIsDialogOpen(false);
    return userToDelete;
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

export default useUserProfileManagement;
