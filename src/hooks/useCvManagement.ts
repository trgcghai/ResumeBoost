import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";
import { Resume } from "@/type";

export const useCvManagement = (resumes: Resume[]) => {
  const [data, setData] = useState<Resume[]>(resumes);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { useDeleteResume } = useFetchAdminData();
  const { deleteResume } = useDeleteResume();

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (cvId: string) => {
    const res = await deleteResume(cvId);

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
