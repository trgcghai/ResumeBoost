import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signOut } from "firebase/auth";
import { logout } from "@/store/slices/userSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const AdminLayout: React.FC = () => {
  const authUser = auth.currentUser;
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase

      dispatch(logout()); // Cập nhật trạng thái đăng xuất trong Redux
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white text-black px-6 py-4 shadow-md border border-b-gray-300/50 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-10 rounded aspect-square" />
          <p>ResumeBoost Admin</p>
        </h1>

        {isAuthenticated && user && (
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage
                    src={authUser?.photoURL || ""}
                    alt={authUser?.email || "User"}
                  />
                  <AvatarFallback className="bg-main text-white">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" align="end">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={authUser?.photoURL || ""} />
                  <AvatarFallback className="bg-main text-white">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-semibold">Xin chào</h4>
                  <p className="text-sm font-semibold">{authUser?.email}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </header>
      <div className="flex flex-grow">
        {/* Admin sidebar */}
        <AdminSidebar />

        {/* Admin content area */}
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
