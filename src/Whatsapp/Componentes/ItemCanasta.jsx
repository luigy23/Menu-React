import React from 'react'
import { FontAwesomeIcon as Icono}  from '@fortawesome/react-fontawesome'
import {faXmark, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

const ItemCanasta = ({data, index, delToCart,addToCart}) => {
  return (
    <>
    <div className='item-canasta' key={index}>{data.titulo}<b>x{data.cantidad}</b>
    <button className='btnItem btnRestar'onClick={()=>delToCart(data.id,data.cantidad,2)}><Icono icon= {faMinus}/></button>
    <button className='btnItem btnSumar'onClick={()=>addToCart(data.id,data.cantidad,1)}><Icono icon= {faPlus}/></button>
    <button className='btnItem btnBorrar' onClick={()=>delToCart(data.id,data.cantidad,1)}><Icono icon= {faXmark}/></button>
    </div>
    </>
  )
}

export default ItemCanasta