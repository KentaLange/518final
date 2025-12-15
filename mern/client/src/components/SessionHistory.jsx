import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SessionHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('http://localhost:5050/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSessions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  const deleteSession = async (id) => {
    if (!confirm('Are you sure you want to delete this session?')) {
      return;
    }

    try {
      await fetch(`http://localhost:5050/session/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getSessionColor = (type) => {
    if (type === 'work') return 'bg-red-100 text-red-800';
    if (type === 'short-break') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8">
        <p className="text-center text-gray-600">Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Session History</h1>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No sessions yet. Start your first Pomodoro timer!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSessionColor(
                        session.type
                      )}`}
                    >
                      {session.type === 'work'
                        ? 'Work Session'
                        : session.type === 'short-break'
                        ? 'Short Break'
                        : 'Long Break'}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {session.duration} minutes
                    </span>
                    {session.completed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                        Incomplete
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Started: {formatDate(session.startTime)}
                  </p>
                  {session.endTime && (
                    <p className="text-sm text-gray-600 mb-2">
                      Ended: {formatDate(session.endTime)}
                    </p>
                  )}
                  {session.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Notes:</span> {session.notes}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteSession(session._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
