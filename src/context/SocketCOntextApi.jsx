import { selectToken } from "@/redux/features/authSlice";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socketLoading, setSocketLoading] = useState(false);
  const token = useSelector(selectToken);
  const socketRef = useRef(null);

  // const socket = useMemo(() => {
  //   setSocketLoading(true);
  //   if (token) {
  //     const socketStore = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  //       // transports: ["websocket"],
  //       auth: {
  //         token
  //       }
  //     });
  //     socketStore.on("connect", () => {
  //       setSocketLoading(false);
  //     });
  //     return socketStore;
  //   }
  //   setSocketLoading(false);
  //   return null;
  // }, [token]);

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    setSocketLoading(true);

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
      autoConnect: true
      // transports: ['websocket'], // optional
    });

    socket.on("connect", () => {
      setSocketLoading(false);
      // console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current = socket;

    // Clean up on unmount or token change
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, socketLoading }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
