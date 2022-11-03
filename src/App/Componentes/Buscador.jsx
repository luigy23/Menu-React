import React from 'react'
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "../Estilos/NavMenu.scss"

const Buscador = ({evento,setTexto}) => {


    const limpiar = ()=>{
     

      setTexto("")
      const buscador = document.getElementById("buscador")
      buscador.value =""
    }
    const enter = (e)=>{
      setTexto(e.target.value)
      evento();
        if (e.key==="Enter"){
     
        }
      }
    
    

  

  return (
    <div className='BuscarContenedor'>
    <input id='buscador' className='Buscar' onChange={(e)=>enter(e)} onKeyDown={(e)=>enter(e)}  type="text" placeholder="Escribe aquí el producto">
    </input>
    <button className='btnItem' ><Icono onClick={()=>limpiar()} icon={faXmark}></Icono></button>
</div>  )
}

export default Buscador