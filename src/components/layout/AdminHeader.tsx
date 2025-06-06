import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { auth } from "@/lib/firebase";
import { logout } from "@/store/slices/userSlice";
import { signOut } from "firebase/auth";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";

const AdminHeader = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authUser = auth.currentUser;
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile, setSidebarOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase

      dispatch(logout()); // Cập nhật trạng thái đăng xuất trong Redux
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-white text-black px-6 py-4 fixed top-0 right-0 left-0 z-10 border border-b-gray-300/70 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {isMobile ? (
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded-md text-textDark hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <Link to={"/admin/dashboard"} className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="w-10 rounded aspect-square"
            />
            <p className="text-xl font-bold">ResumeBoost Admin</p>
          </Link>
        )}
      </div>

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
  );
};
export default AdminHeader;
