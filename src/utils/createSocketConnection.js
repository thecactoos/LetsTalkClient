import { io } from 'socket.io-client';

export default function createSocketConnection() {
  const socket = io(
    process.env.REACT_APP_API_PROD_URL || 'http://localhost:8000/',
    {
      path: '/socket',
      withCredentials: true,
    },
  );

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
