import { useState } from "react";
import useFetchAdminData from "./fetch/useFetchAdminData";
import { UserProfile } from "@/type";
import { Timestamp } from "firebase/firestore";

export const useUserProfileManagement = (profiles: UserProfile[]) => {
  const [data, setData] = useState(profiles);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { useDeleteProfile, useUpdateUserRole } = useFetchAdminData();
  const { updateUserRole } = useUpdateUserRole();
  const { deleteProfile } = useDeleteProfile();

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (profileId: string) => {
    const res = await deleteProfile(profileId);
    console.log(res);

    if (res) {
      console.log(profileId);

      console.log(data.filter((item) => item.id != profileId));

      setData(data.filter((item) => item.id !== profileId));
    }

    closeDeleteDialog();
    return res;
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole(userId, newRole);

      if (res) {
        setData(
          data.map((user) =>
            user.userId === userId
              ? {
                  ...user,
                  role: newRole,
                  updatedAt: Timestamp.fromDate(new Date()),
                }
              : user
          )
        );
      }

      return res;
    } catch (error) {
      console.error("Error updating user role:", error);
      return false;
    }
  };

  return {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    handleUpdateRole,
  };
};

export default useUserProfileManagement;
