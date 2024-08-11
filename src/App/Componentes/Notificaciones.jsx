import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { Badge } from '@nextui-org/badge';
import { useDispatch, useSelector } from 'react-redux';
import { ioSocket } from '../Socket';
import { ToastContainer, toast } from 'react-toastify';
import { agregarNotificacion, limpiarNotificaciones } from '../Reducers/usuarioReducer';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';


const Notificaciones = () => {

  const state = useSelector((state) => state.usuario);
  const { user } = state;
  const [notificaciones, setNotificaciones] = useState([]) //estado de notificaciones [
  const dispatch = useDispatch()

  const mostrarNotificacion = (...args) => {
    const mensaje = args[0]
    const estados = {
      'Listo': 'está listo ✅',
      'Cancelado': 'fue cancelado❌',
    }
    const texto = `(${mensaje.codProducto}) de la mesa (${mensaje.mesa}) ${estados[mensaje.estado]}`
    //toast(texto)

    dispatch(agregarNotificacion(texto))
    setNotificaciones((notificaciones) => [...notificaciones, texto])
    

    console.log(state.notificaciones)
    
    console.log(args)

  }
  const limpiar = ()=>{
    setNotificaciones([])
    dispatch(limpiarNotificaciones())
  }


  useEffect(() => {

    setNotificaciones(state.notificaciones)


    ioSocket.on(user, mostrarNotificacion);
    //request a la api


    ;

    return () => {
      ioSocket.off(user, mostrarNotificacion);
    };




  }, []);


  return (
    <>
    
      <Popover placement="bottom" color='primary' >
        <PopoverTrigger>
          <Button isIconOnly={true} variant='light' >
            
            <Badge content={notificaciones.length} color="danger" placement='top-right' size='sm' shape='circle' disableOutline 
            isInvisible={notificaciones.length==0
            }
            >
              <Icono icon={faBell} className='text-slate-100 ' size='xl' />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-slate-100'>
        <Button onClick={limpiar} size='sm' variant='light' color='success'>Limpiar</Button>
        <div className='flex justify-center flex-col items-start gap-4 py-2 px-1 overflow-y-scroll scrollbar'>
            {
              notificaciones.map((mensaje) => (
               
                  <span className='text-slate-900 bg-slate-50 shadow-sm px-2 py-1 rounded-lg'>{mensaje}</span>
                  
               
              ))

            }
          
            </div>
        </PopoverContent>
      </Popover>



      <ToastContainer />

    </>
  )
}

export default Notificaciones