import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";
import { Resume } from "@/type";

export const useCvManagement = (resumes: Resume[]) => {
  const [data, setData] = useState<Resume[]>(resumes);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { useDeleteResume, useUpdateUserProfileStatistics } =
    useFetchAdminData();
  const { deleteResume } = useDeleteResume();
  const { updateUserProfileStatistics } = useUpdateUserProfileStatistics();

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (cvId: string) => {
    const res = await deleteResume(cvId);
    await updateUserProfileStatistics(
      data.find((cv) => cv.id === cvId)?.user.userId || ""
    );

    if (res) {
      setData(data.filter((cv) => cv.id !== cvId));
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

export default useCvManagement;
