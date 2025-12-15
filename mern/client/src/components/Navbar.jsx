import { NavLink } from "react-router-dom";

export default function Navbar() {
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

          <div className="flex gap-3">
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
          </div>
        </div>
      </nav>
    </div>
  );
}