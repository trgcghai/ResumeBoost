import { signOut } from "firebase/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/slices/userSlice";
import useUserProfileByUserId from "@/hooks/fetch/useUserProfileByUserId";
import { format } from "date-fns";

const Overview: React.FC = () => {
  const user = auth.currentUser;
  const dispatch = useAppDispatch();
  const { data: userProfile } = useUserProfileByUserId(user?.uid || "");

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase

      dispatch(logout()); // Cập nhật trạng thái đăng xuất trong Redux
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border border-gray-200 shrink-0">
            <AvatarImage
              src={user?.photoURL || ""}
              alt={user?.displayName || ""}
            />
            <AvatarFallback className="bg-main text-white text-lg">
              <User className="h-6 w-6 sm:h-8 sm:w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            {" "}
            {user?.displayName ? (
              <>
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  {user?.displayName}
                </h1>
                <p className="text-textNormal text-sm sm:text-base truncate">
                  {user?.email}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg sm:text-xl font-bold truncate">
                  {user?.email}
                </p>
              </>
            )}
          </div>
        </div>

        <Button
          variant="default"
          size="default"
          className="justify-start bg-danger text-white cursor-pointer hover:bg-red-600 w-full sm:w-auto"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white border rounded-lg p-3 sm:p-4 flex md:flex-col lg:flex-row items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold">Tổng số CV</h3>
          <p className="text-lg sm:text-2xl font-bold ml-2">
            {userProfile?.cvCount || 0}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-3 sm:p-4 flex md:flex-col lg:flex-row items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold">
            Điểm trung bình
          </h3>
          <p className="text-lg sm:text-2xl font-bold ml-2">
            {userProfile?.avgScore.toFixed(2) || 0}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-3 sm:p-4">
          <div className="flex md:flex-col lg:flex-row items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-0">
              CV gần nhất
            </h3>
            <p className="text-lg sm:text-2xl font-bold ml-2">
              {userProfile?.lastUploadTime
                ? format(userProfile?.lastUploadTime.toDate(), "dd/MM/yyyy")
                : "Chưa có CV"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
