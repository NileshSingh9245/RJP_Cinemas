#!/bin/bash
# Automated script to build frontend, start backend, and test endpoints

# Step 1: Build the React frontend
cd "$(dirname "$0")/../front-end" || exit 1
echo "Building React frontend..."
npm install && npm run build

# Step 2: Start the backend server in the background
cd ../back-end || exit 1
echo "Starting backend server..."
npm install
node server.js &
BACKEND_PID=$!
sleep 5 # Give backend time to start

# Step 3: Test endpoints
API_URL="http://localhost:8080/api/booking"
FRONTEND_URL="http://localhost:8080"

echo "Testing frontend (should return HTML)..."
curl -i "$FRONTEND_URL"

echo "Testing backend API (should return JSON)..."
curl -i "$API_URL"

# Step 4: Cleanup
kill $BACKEND_PID

echo "\nTest run complete. Backend server stopped."
