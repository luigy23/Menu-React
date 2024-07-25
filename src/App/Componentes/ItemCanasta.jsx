import React from 'react'
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { addToCart, calcularTotal, delToCart } from "../Actions/canastaActions";
import { useEffect } from 'react';
import "../Estilos/Canasta.scss"
const ItemCanasta = ({ data: producto }) => {

  const dispatch = useDispatch()
  const {Nombre, Cantidad} = producto
  const restar = () => {

  
    dispatch(delToCart(producto.codProducto, producto.Cantidad, 2))
    dispatch(calcularTotal())
  }
  const sumar = () => {
    if(producto.Cantidad >= producto.Stock){
      alert('No hay suficiente stock')
      return
    }

    dispatch(addToCart(producto.codProducto, producto.Cantidad, 1))
    dispatch(calcularTotal())
  }
  const borrar = () => {
    dispatch(delToCart(producto.codProducto, producto.Cantidad, 1))
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