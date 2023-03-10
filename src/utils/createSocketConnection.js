import { io } from 'socket.io-client';

export default function createSocketConnection() {
  const socket = io(
    process.env.REACT_APP_API_PROD_URL || 'http://localhost:8000/',
    {
      path: '/api/socket',
      withCredentials: true,
    },
  );

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
// Changes made:

// Imported io from socket.io-client instead of using the global io object.
// Used the process.env.REACT_APP_API_PROD_URL environment variable as the base URL for the socket connection instead of using isDev.
// Added a fallback to 'http://localhost:8000/' if the environment variable is not defined.
// Updated the path to '/api/socket'.
// Changed the callback parameter from res to resolve for consistency with the Promise API.
