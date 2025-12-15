import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <nav className="bg-white shadow-lg rounded-lg mb-6">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🍅</div>
            <NavLink to="/" className="text-xl font-bold text-gray-800 hover:text-red-500 transition-colors">
              Pomodoro Study Timer
            </NavLink>
          </div>

          <div className="flex gap-3 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-red-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Timer
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  History
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-300">
                <span className="text-sm text-gray-600">
                  Hello, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 ml-3 pl-3 border-l border-gray-300">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}