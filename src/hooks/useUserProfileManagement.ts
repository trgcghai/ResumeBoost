import { UserProfile } from "@/type";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";

export const useUserProfileManagement = (
  initialData: UserProfile[] | [] = []
) => {
  const [data, setData] = useState<UserProfile[]>(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { useDeleteProfile } = useFetchAdminData();
  const { deleteProfile } = useDeleteProfile();

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (userId: string) => {
    return await deleteProfile(userId);
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
