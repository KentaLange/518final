# Pomodoro Study Timer

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking study sessions using the Pomodoro Technique. This educational tool helps students manage their study time effectively with 25-minute work sessions and scheduled breaks.

## Features

- **Pomodoro Timer**: Customizable timer with work sessions (25 min), short breaks (5 min), and long breaks (15 min)
- **Session Tracking**: Automatically saves completed sessions to MongoDB database
- **Session History**: View all past study sessions with timestamps and notes
- **Dashboard Analytics**: Visual statistics showing total study time, sessions completed, and productivity insights
- **Session Notes**: Add notes to track what you studied during each session
- **Responsive Design**: Beautiful gradient UI built with TailwindCSS

## Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.10.1
- TailwindCSS 4.1.18

### Backend
- Node.js with Express 5.2.1
- MongoDB 7.0.0
- CORS enabled for cross-origin requests

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   cd mern
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   Create a `config.env` file in the `server` directory:
   ```
   ATLAS_URI=your_mongodb_connection_string
   PORT=5050
   ```

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the Application**

   Terminal 1 - Start Backend Server:
   ```bash
   cd server
   npm start
   ```

   Terminal 2 - Start Frontend Dev Server:
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5050

## Usage

### Starting a Study Session

1. Navigate to the Timer page (home)
2. Choose your session type:
   - **Work**: 25-minute focused study session
   - **Short Break**: 5-minute break
   - **Long Break**: 15-minute extended break
3. Click "Start" to begin the timer
4. Add optional notes about what you're studying
5. Timer will automatically save the session when completed

### Viewing History

1. Click "History" in the navigation
2. View all completed and incomplete sessions
3. See timestamps, duration, and notes for each session
4. Delete sessions if needed

### Dashboard Analytics

1. Click "Dashboard" in the navigation
2. View statistics including:
   - Total sessions completed
   - Total hours studied
   - Total minutes
   - Work sessions vs break sessions
3. Read productivity tips

## API Endpoints

### Sessions
- `GET /session` - Get all sessions
- `GET /session/:id` - Get single session by ID
- `POST /session` - Create new session
- `PATCH /session/:id` - Update session (mark complete, add notes)
- `DELETE /session/:id` - Delete session
- `GET /session/stats/summary` - Get statistics summary

## Database Schema

### Sessions Collection
```javascript
{
  type: String,          // 'work', 'short-break', 'long-break'
  duration: Number,      // Duration in minutes
  completed: Boolean,    // Completion status
  startTime: Date,       // Session start timestamp
  endTime: Date,         // Session end timestamp
  notes: String          // Optional study notes
}
```

## Project Structure

```
mern/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── PomodoroTimer.jsx    # Main timer component
│   │   │   ├── SessionHistory.jsx   # History view
│   │   │   ├── Dashboard.jsx        # Analytics dashboard
│   │   │   └── Navbar.jsx           # Navigation component
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles
│   └── package.json
├── server/                 # Backend Express application
│   ├── db/
│   │   └── connection.js            # MongoDB connection
│   ├── routes/
│   │   └── session.js               # Session API routes
│   ├── server.js                    # Express server setup
│   ├── config.env                   # Environment variables
│   └── package.json
└── README.md
```

## Development

### Frontend Development
```bash
cd client
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend Development
```bash
cd server
npm start          # Start server
```

## Deployment

This application can be deployed to Google App Engine following the deployment guide provided in the project documentation.

## Educational Purpose

This application was created as a school project to demonstrate:
- Full-stack web development with MERN stack
- RESTful API design
- State management in React
- Database integration
- Timer functionality and time management techniques
- Responsive UI design

## Contributing

This is a school project. Please contact the project maintainer for contribution guidelines.

## License

This project is created for educational purposes.

## Acknowledgments

- Pomodoro Technique developed by Francesco Cirillo
- TailwindCSS for styling
- MongoDB Atlas for database hosting
