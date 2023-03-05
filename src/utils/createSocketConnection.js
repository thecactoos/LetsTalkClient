import io from 'socket.io-client';
import isDev from './isDev';

export default function createSocketConnection() {
  const socket = io(
    isDev ? 'http://localhost:8000/' : `${process.env.REACT_APP_API_PROD_URL}/`,
    {
      path: '/socket',
      withCredentials: true,
    },
  );
  return new Promise((res) => {
    socket.on('connect', () => {
      res(socket);
    });
  });
}
