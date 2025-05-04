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
import { LogOut, Menu, User, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

const NavItem = ({
  to,
  children,
  setMobileMenuOpen,
}: {
  to: string;
  children: React.ReactNode;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <NavLink
    to={to}
    onClick={() => setMobileMenuOpen(false)}
    className={({ isActive }) =>
      isActive
        ? "text-white bg-main rounded-lg px-4 py-1.5 hover:bg-mainHover"
        : "text-textDark px-4 py-1.5"
    }
  >
    {children}
  </NavLink>
);

const Header = () => {
  const authUser = auth.currentUser;
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase

      dispatch(logout()); // Cập nhật trạng thái đăng xuất trong Redux
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex justify-between items-center bg-white px-4 md:px-6 py-4 shadow fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-7">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="w-10 rounded aspect-square"
            />
            <span className="hidden sm:inline">ResumeBoost</span>
          </Link>
        </div>
        <nav className="flex space-x-4">
          <nav className="hidden md:flex space-x-4 items-center">
            <NavItem setMobileMenuOpen={setMobileMenuOpen} to="/app/home">
              Trang chủ
            </NavItem>
            <NavItem setMobileMenuOpen={setMobileMenuOpen} to="/app/profile">
              Hồ sơ người dùng
            </NavItem>
          </nav>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
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
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="hidden md:block text-white bg-main rounded-lg px-4 py-1.5 hover:bg-mainHover"
          >
            Trang quản trị
          </Link>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="text-textNormal h-6 w-6" />
          ) : (
            <Menu className="text-textNormal h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-20">
          <div className="p-4 flex flex-col space-y-4">
            <NavItem setMobileMenuOpen={setMobileMenuOpen} to="/app/home">
              Trang chủ
            </NavItem>
            <NavItem setMobileMenuOpen={setMobileMenuOpen} to="/app/profile">
              Hồ sơ người dùng
            </NavItem>
            {user?.role === "admin" && (
              <NavItem
                setMobileMenuOpen={setMobileMenuOpen}
                to="/admin/dashboard"
              >
                Trang quản trị
              </NavItem>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
