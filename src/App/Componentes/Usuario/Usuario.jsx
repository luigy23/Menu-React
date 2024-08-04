import {Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from '@nextui-org/react';
import Cookies from 'js-cookie';
import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const Usuario = () => {
    const state = useSelector((state) => state.usuario); //estado
    const cerrarSesion = () => {
        Cookies.remove('token')
        //eliminamos del token del localstorage
        localStorage.removeItem('token')
        
        //actualizamos la pagina
        window.location.href = '/'
    }

  return (
    <div
    className=''
    >

<Dropdown >
      <DropdownTrigger className=''>
      <Button 
      startContent={<Icono icon={faUser} />}
          color='success' className='bg-shamrock-400 text-shamrock-800'
        >
          {state.user} : {state.idCargo}
        </Button>
      </DropdownTrigger>

        


      <DropdownMenu aria-label="Static Actions" color='success'  >

    {state.idCargo === 1 &&
        <DropdownItem key="Administración"
        href="/admin"
        color='primary' className='transition-colors ease-in-out' >
         
            Administración
        </DropdownItem>
}

        <DropdownItem key="configuracion" href="/config" color='primary'  className='transition-colors ease-in-out relative'   >
            Configuracion
        </DropdownItem>




        <DropdownItem key="logout"
        onPress={cerrarSesion}
        color='danger' className='transition-colors ease-in-out' >
       
          Cerrar Sesion


        </DropdownItem>

      </DropdownMenu>
    </Dropdown>
    
    
    </div>
  )
}

export default Usuario