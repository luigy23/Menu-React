import { Button } from '@nextui-org/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from '@nextui-org/dropdown';
import Cookies from 'js-cookie';
import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";



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

<Dropdown>
      <DropdownTrigger>
      <Button 
      startContent={<Icono icon={faUser} />}
          variant="bordered" className='bg-shamrock-300 text-shamrock-700 py-1 px-2 rounded-lg gap-2 justify-center items-center hover:bg-shamrock-400 transition-colors'
        >
          {state.user}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className='bg-shamrock-300 rounded-b-lg items-center justify-center'>
        <DropdownItem key="new"  >
            <Button className='hover:bg-shamrock-400 transition-colors w-full rounded-2xl py-1 px-2 ' onClick={cerrarSesion}>
            Cerrar Sesion
            </Button>
            </DropdownItem>

      </DropdownMenu>
    </Dropdown>
    
    
    </div>
  )
}

export default Usuario