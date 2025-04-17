import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/store/slices/userSlice";

const Header = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || "https://i.pravatar.cc/30"}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-sm font-medium text-textDark">
                {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-textDark hover:text-main"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
