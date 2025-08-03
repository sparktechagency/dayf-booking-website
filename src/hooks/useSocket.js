import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/features/authSlice";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getBackendBaseUrl } from "@/config/envConfig";

export default function useSocket() {
  const [socket, setSocket] = React.useState(null);
  const token = useSelector(selectToken);

  useEffect(() => {
    const newSocket = io(getBackendBaseUrl(), {
        auth: {token: token},
        transports: ["websocket", "polling"],
        autoConnect: false,
        reconnection: true
    });

    newSocket.connect();
    setSocket(newSocket);

    return () => {
        if(newSocket.connected) {
            newSocket.disconnect();
        }
    }
  }, [token]);

  return socket;
}
