import React from 'react'
import "../Estilos/Mesas.css"
const Mesa = ({nombre, estado}) => {
  return (
    <>
    <div className={`contenedor-mesa estado-${estado}`}>
    <h3 >{nombre}</h3>
    </div>    
    </>  )
}

export default Mesa