import { Button } from '@nextui-org/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from '@nextui-org/dropdown';
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
          {state.user}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" color='success' >
        <DropdownItem key="configuracion" color='primary'  className='transition-colors ease-in-out'  >
            <Link to='/config' >
            Configuracion
            </Link>
        </DropdownItem>
        <DropdownItem key="logout" color='danger' className='transition-colors ease-in-out' >
          <button onClick={cerrarSesion}>
          Cerrar Sesion
          </button>

        </DropdownItem>

      </DropdownMenu>
    </Dropdown>
    
    
    </div>
  )
}

export default Usuario