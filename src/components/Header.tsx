import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { User } from 'lucide-react'; // dùng biểu tượng nếu thích

const Header = () => {
  const { user } = useAppContext();

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
      <div className="flex items-center gap-7">
        <div className="text-xl font-bold">Logo</div>
        <nav className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-blue-500 rounded px-3 hover:scale-105'
                : 'text-gray-500 px-3'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-blue-500 px-3 rounded hover:scale-105'
                : 'text-gray-700 px-3'
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Avatar/Login button */}
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/30" // hoặc user.avatar nếu có
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
          </div>
        ) : (
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-1.5 rounded hover:scale-105">
            <User size={18} />
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
