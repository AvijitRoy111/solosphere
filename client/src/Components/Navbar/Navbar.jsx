import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import logo from "../../assets/images/logo.png"
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full navbar bg-background dark:bg-background shadow-sm  border-b-2 border-b-gray-300 px-4 md:px-12 lg:px-20 mb-2">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">SoloSphere</span>
        </div>
      </div>

      <div className="flex-none flex items-center gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><div>Home</div></li>
          <li><div>Login</div></li>
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img referrerPolicy="no-referrer" alt="User Profile Photo" src="" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-gray-900 text-white rounded-box w-52"
          >
            <li><div className="justify-between">Add Job</div></li>
            <li><div>My Posted Jobs</div></li>
            <li><div>My Bids</div></li>
            <li><div>Bid Requests</div></li>
            <li className="mt-2"><button className="bg-gray-200 dark:bg-gray-700 block text-center">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
