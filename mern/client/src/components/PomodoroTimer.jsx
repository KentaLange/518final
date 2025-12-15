import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [sessionId, setSessionId] = useState(null);
  const [notes, setNotes] = useState('');
  const intervalRef = useRef(null);

  const WORK_TIME = 25;
  const SHORT_BREAK = 5;
  const LONG_BREAK = 15;

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleSessionComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes, seconds]);

  const startTimer = async () => {
    if (!isActive) {
      const duration = sessionType === 'work' ? WORK_TIME : sessionType === 'short-break' ? SHORT_BREAK : LONG_BREAK;

      try {
        const response = await fetch('http://localhost:5050/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: sessionType,
            duration: duration,
            startTime: new Date().toISOString(),
            completed: false,
          }),
        });
        const data = await response.json();
        setSessionId(data.insertedId);
      } catch (error) {
        console.error('Error starting session:', error);
      }
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    if (sessionType === 'work') {
      setMinutes(WORK_TIME);
    } else if (sessionType === 'short-break') {
      setMinutes(SHORT_BREAK);
    } else {
      setMinutes(LONG_BREAK);
    }
  };

  const handleSessionComplete = async () => {
    setIsActive(false);

    if (sessionId) {
      try {
        await fetch(`http://localhost:5050/session/${sessionId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            completed: true,
            endTime: new Date().toISOString(),
            notes: notes,
          }),
        });
      } catch (error) {
        console.error('Error completing session:', error);
      }
    }

    alert(`${sessionType === 'work' ? 'Work' : 'Break'} session completed!`);
    setNotes('');
    resetTimer();
  };

  const changeSessionType = (type) => {
    setSessionType(type);
    setIsActive(false);
    setSeconds(0);
    if (type === 'work') {
      setMinutes(WORK_TIME);
    } else if (type === 'short-break') {
      setMinutes(SHORT_BREAK);
    } else {
      setMinutes(LONG_BREAK);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Pomodoro Timer
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => changeSessionType('work')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sessionType === 'work'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Work
        </button>
        <button
          onClick={() => changeSessionType('short-break')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sessionType === 'short-break'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => changeSessionType('long-break')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sessionType === 'long-break'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Long Break
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="text-8xl font-bold text-gray-800 mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-xl text-gray-600 capitalize">{sessionType.replace('-', ' ')}</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-8 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about what you studied..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">How to use:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1. Choose your session type (Work/Short Break/Long Break)</li>
          <li>2. Click Start to begin your timer</li>
          <li>3. Focus on your task until the timer completes</li>
          <li>4. Take breaks between work sessions</li>
          <li>5. Add notes to track your progress</li>
        </ul>
      </div>
    </div>
  );
}
