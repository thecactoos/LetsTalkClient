import io from "socket.io-client";

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default function createSocketConnection() {
  const socket = io(`${isDevelopment ? `http://localhost:8000` : "/"}`, {
    path: "/socket",
    withCredentials: true,
  });
  return new Promise((res) => {
    socket.on("connect", () => {
      res(socket);
    });
  });
}
