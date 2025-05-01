import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";
import { UserProfile } from "@/type";

export const useUserProfileManagement = (profiles: UserProfile[]) => {
  const [data, setData] = useState(profiles);
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
    const res = await deleteProfile(userId);

    if (res) {
      setData(data.filter((item) => item.userId !== userId));
    }

    closeDeleteDialog();
    return res;
  };

  return {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  };
};

export default useUserProfileManagement;
