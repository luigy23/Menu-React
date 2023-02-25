import React from 'react'
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { addToCart, calcularTotal, delToCart } from "../Actions/canastaActions";
import { useEffect } from 'react';
import "../Estilos/Canasta.scss"
const ItemCanasta = ({ data, index }) => {

  const dispatch = useDispatch()
  const {Nombre, Cantidad} = data
  const restar = () => {

  
    dispatch(delToCart(data.codProducto, data.Cantidad, 2))
    dispatch(calcularTotal())
  }
  const sumar = () => {
    dispatch(addToCart(data.codProducto, data.Cantidad, 1))
    dispatch(calcularTotal())
  }
  const borrar = () => {
    dispatch(delToCart(data.codProducto, data.Cantidad, 1))
    dispatch(calcularTotal())
  }

useEffect(() => {
  //console.log(producto.Nombre)

  return () => {
    
  }
}, [])



  return (
    <>
      <div className='item-canasta' >{Nombre}<b>x{Cantidad}</b>
        <button className='btnItem btnRestar' onClick={() => restar()}><Icono icon={faMinus} /></button>
        <button className='btnItem btnSumar' onClick={() => sumar()}><Icono icon={faPlus} /></button>
        <button className='btnItem btnBorrar' onClick={() => borrar()}><Icono icon={faXmark} /></button>
      </div>
    </>
  )
}

export default ItemCanasta