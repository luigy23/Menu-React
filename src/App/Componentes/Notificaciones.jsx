import { Button } from '@nextui-org/button'
import React, { useEffect, useState } from 'react'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { Badge } from '@nextui-org/badge';
import { useSelector } from 'react-redux';
import { ioSocket } from '../Socket';
import { ToastContainer, toast } from 'react-toastify';


const Notificaciones = () => {

    const state = useSelector((state) => state.usuario);  
    const { user } = state;

    const mostrarNotificacion = (...args)=>{
        const mensaje = args[0]
        const estados = {
            'Listo': 'está listo ✅',
            'Cancelado': 'fue cancelado❌',
        }
        toast(`(${mensaje.codProducto}) de la mesa (${mensaje.mesa}) ${estados[mensaje.estado]}`)
        console.log(args)

    }

    useEffect(() => {
        
       
    
        ioSocket.on(user, mostrarNotificacion);
        //request a la api
    
        
        ;
    
        return () => {
          ioSocket.off(user, mostrarNotificacion);
        };
    
    
    
     
       }, []);


  return (
   <>
   
   <Button isIconOnly ={true} variant='light' >
   <Badge  content="5" color="danger" placement='top-right' size='sm' shape='circle' disableOutline>
    <Icono icon={faBell} className='text-slate-100 ' size='xl'/>
    </Badge>
    </Button>
    <ToastContainer/>
 
   </>
  )
}

export default Notificaciones