import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authContext } from "./AuthContext";

import { BASE_URL as API_URL } from "../config";

const BASE_URL = API_URL.replace("/api/v1", "") || "/";

const socketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(authContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket && user) {
      // Join binary room on login
      const userId = user._id || user.id;
      socket.emit("JOIN_ROOM", userId);
      console.log(`Neural Link Established for Node: ${userId}`);
    }
  }, [socket, user]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
