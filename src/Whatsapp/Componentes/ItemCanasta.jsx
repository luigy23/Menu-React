import React from 'react'

const ItemCanasta = ({data, index, delToCart,}) => {
  return (
    <>
    <div className='item-canasta' key={index}>{data.titulo}<b>x{data.cantidad}</b>
    <button onClick={()=>delToCart(data.id,data.cantidad,1)}>X</button>
    <button onClick={()=>delToCart(data.id,data.cantidad,2)}>-1</button>
    </div>
    </>
  )
}

export default ItemCanasta