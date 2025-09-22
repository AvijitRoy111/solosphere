import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full navbar bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 md:px-12 lg:px-20 transition-colors duration-300">
      {/* Left side */}
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img
            className="w-auto h-8 brightness-200"
            src={logo}
            alt="SoloSphere Logo"
          />
          <span className="font-extrabold text-xl text-gray-900 dark:text-white">
            SoloSphere
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-none flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 text-gray-800 dark:text-gray-200 gap-2">
          {/* Home always visible */}
          <li>
            <Link
              to="/"
              className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          {/* Login only if NOT user */}
          {!user && (
            <li>
              <Link
                to="/signIn"
                className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5  text-white" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        {/* If user IS logged in */}
        {user && (
          <>
            {/* Avatar dropdown */}
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-500 dark:hover:ring-yellow-400 transition-all duration-200"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content mt-3 -mr-10 z-[1] p-2 shadow-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-box w-52 transition-colors duration-300 ">
                <li>
                  <Link
                    to="/add-job"
                    className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    Add Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-posted-job"
                    className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    My Posted Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-bids"
                    className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    My Bids
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bids-request"
                    className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    Bid Requests
                  </Link>
                </li>
                <li className="mt-2 w-full flex items-center justify-center">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white text-center transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
