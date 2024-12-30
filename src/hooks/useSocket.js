import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (subjectId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!subjectId) return;
    const localhost = "https://99a0-110-226-181-47.ngrok-free.app/";
    const socket = io(`${localhost}`); // Replace with your server URL
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('select_subject', subjectId);
    });

    socket.on('joined_room', (msg) => {
      console.log(msg);
    });

    socket.on('room_full', (isSameRoom) => {
      if (isSameRoom) {
        console.log('The sockets are in the same room!');
      }
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [subjectId]);

  return socket;
};

export default useSocket;
