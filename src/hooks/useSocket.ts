import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { apiUrl } from '../config';

interface ServerToClientEvents {
  messenger: (data: { id_sender: string, id_customer: string, id_shop: string, id_roomChat:string }) => void;
}

interface ClientToServerEvents {
  messenger: (message: string) => void;
}

const useSocket = () => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    const socketInstance = io(apiUrl);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to server');
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
