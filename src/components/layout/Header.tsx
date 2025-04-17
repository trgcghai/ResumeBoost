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

const Header = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
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

      <div>
        {isAuthenticated && user && (
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage
                    src={user.avatar || ""}
                    alt={user.email || "User"}
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
                  <AvatarImage src={user.avatar || ""} />
                  <AvatarFallback className="bg-main text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-semibold">Xin chào</h4>
                  <p className="text-sm font-semibold">{user.email}</p>
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
      </div>
    </header>
  );
};

export default Header;
