import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/store/slices/userSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
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

  const getUserInitials = () => {
    return (
      authUser?.displayName?.[0]?.toUpperCase() ||
      authUser?.email?.[0]?.toUpperCase()
    );
  };

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-7">
        <Link to="/" className="text-xl font-bold">
          ResumeBoost
        </Link>
        <nav className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-main rounded-lg px-4 py-1.5 hover:bg-mainHover"
                : "text-textDark px-4 py-1.5"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-main rounded-lg px-4 py-1.5 hover:bg-mainHover"
                : "text-textDark px-4 py-1.5"
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
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
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" align="end">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={authUser?.photoURL || ""} />
                  <AvatarFallback className="bg-main text-white">
                    {getUserInitials()}
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
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="text-white bg-main rounded-lg px-4 py-1.5 hover:bg-mainHover"
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
