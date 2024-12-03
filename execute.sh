#!/bin/bash

# Navigate to the backend directory and start the backend server
echo "Starting the backend server..."
cd backend
npm install   # Ensure dependencies are installed
node app.js &   # Start the backend server in the background (assuming it uses npm start)

# Wait for the backend server to start
echo "Waiting for backend to start..."
sleep 5  # Adjust if necessary for backend startup time

# Navigate to the frontend directory and start the frontend
echo "Starting the frontend server..."
cd ../frontend
npm install   # Ensure frontend dependencies are installed
npm start &   # Start the frontend server in the background

# Wait for frontend server to start (optional)
echo "Frontend server started."
wait
