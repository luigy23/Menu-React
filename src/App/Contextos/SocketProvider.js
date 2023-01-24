import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { SocketContext } from './SocketContext';
 
const apisocket = process.env.REACT_APP_SOCKET;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(apisocket);
    setSocket(socket);
    socket.on('connect', () => {
      console.log('connected to server ');
      
    
    });
    socket.on('connect_error', (err) => {
      console.log('error de conexion ', err);
      
    
    });

    return () => {
      
      socket.off('connect', () => {
        console.log('connected to server ');
        
      
      })

    }



  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};