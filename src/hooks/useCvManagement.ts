import { Resume } from "@/type";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";

export const useCvManagement = (initialData: Resume[] | [] = []) => {
  const [data, setData] = useState<Resume[]>(initialData);
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
    return await deleteResume(cvId);
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
