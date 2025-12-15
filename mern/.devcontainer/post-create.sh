#!/bin/bash

echo "🚀 Setting up MERN Pomodoro App development environment..."

# Install server dependencies
echo "📦 Installing server dependencies..."
cd /workspace/server && npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd /workspace/client && npm install

# Configure Google Cloud CLI
echo "☁️  Google Cloud CLI is installed and ready!"
gcloud version

# Create a sample config.env if it doesn't exist
if [ ! -f /workspace/server/config.env ]; then
    echo "📝 Creating sample config.env file..."
    cat > /workspace/server/config.env << EOF
ATLAS_URI=mongodb://mongodb:27017/pomodoro
PORT=5050
EOF
    echo "✅ Sample config.env created. Update with your MongoDB Atlas URI if needed."
fi

echo "✨ Development environment setup complete!"
echo "🎯 To start the app:"
echo "   Backend:  cd server && npm start"
echo "   Frontend: cd client && npm run dev"
