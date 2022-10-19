import React from 'react'
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "../Estilos/NavMenu.css"

const Buscador = ({evento,setTexto}) => {


    
    const enter = (e)=>{

        if (e.key==="Enter"){
           
          evento();
        }
      }
    
    

  

  return (
    <div className='BuscarContenedor'>
    <input className='Buscar' onChange ={(e)=>{setTexto(e.target.value)}} onKeyDown={(e)=>enter(e)}  type="text" placeholder="Hamburguesa">
    </input>
    
    {/*<button className='btnItem' style={{color:"#fff"}}><Icono onClick={mostrar()} icon={faSearch}></Icono></button>*/}
    </div>  )
}

export default Buscador