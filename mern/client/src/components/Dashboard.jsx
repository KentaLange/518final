import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    workSessions: 0,
    breakSessions: 0,
    totalHours: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5050/session/stats/summary');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-8">
        <p className="text-center text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Sessions</p>
              <p className="text-4xl font-bold mt-2">{stats.totalSessions}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Hours</p>
              <p className="text-4xl font-bold mt-2">{stats.totalHours}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Minutes</p>
              <p className="text-4xl font-bold mt-2">{stats.totalMinutes}</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-full p-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Work Sessions
          </h2>
          <div className="flex items-baseline">
            <p className="text-5xl font-bold text-red-500">{stats.workSessions}</p>
            <p className="ml-3 text-gray-600">completed</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Keep up the great work! Each session brings you closer to your goals.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Break Sessions
          </h2>
          <div className="flex items-baseline">
            <p className="text-5xl font-bold text-green-500">{stats.breakSessions}</p>
            <p className="ml-3 text-gray-600">taken</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Remember to take regular breaks to stay productive and refreshed.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Productivity Tips
        </h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              <strong>Stay Focused:</strong> During work sessions, eliminate distractions and focus on a single task.
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              <strong>Take Breaks:</strong> Use short breaks to rest your eyes, stretch, or grab a healthy snack.
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 mr-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              <strong>Track Progress:</strong> Add notes to each session to track what you accomplished.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
