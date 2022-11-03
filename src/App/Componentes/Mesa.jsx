import React from 'react'
import { useDispatch } from 'react-redux';
import { redirect, Link } from 'react-router-dom';
import {  seleccionarMesa } from '../Actions/canastaActions';
import "../Estilos/Mesas.scss"
const Mesa = ({nombre, estado}) => {

  const dispatch = useDispatch()


  const click =()=>{
    dispatch(seleccionarMesa(nombre));
     
     
  }


  return (
    <>
    <Link className='Link' to={"/"}>
    <div onClick={()=> click()} className={`contenedor-mesa estado-${estado}` }>
    <h3 >{nombre}</h3>
    </div>    
    </Link>
    </>  )
}

export default Mesa