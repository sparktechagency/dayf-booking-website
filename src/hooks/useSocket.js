// import { selectToken } from '@/redux/features/authSlice';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

// export const useSocket = () => {
//   const [socket, setSocket] = useState(null);
//   const token = useSelector(selectToken);
//   console.log('Socket token:', token);

//   useEffect(() => {
//     const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
//      auth: { token },
//       transports: ['websocket', 'polling'],
//       autoConnect: false,
//       reconnection: true,
//     });

//     newSocket.connect();
//     setSocket(newSocket);

//     return () => {
//       if (newSocket.connected) {
//         newSocket.disconnect();
//       }
//     };
//   }, [token]);

//   return socket;
// };
