import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useConnectSocket = (url: string, userId: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(url);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('registerUser', { userId });
      socket.on('match', (data) => {
        console.log(`Se recibio un match ${data}`);
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected. Reconnecting...');
    });

    socket.on('connect_error', (error: unknown) => {
      console.error('Socket.IO connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, userId]);

  return socketRef.current;
};

export default useConnectSocket;
