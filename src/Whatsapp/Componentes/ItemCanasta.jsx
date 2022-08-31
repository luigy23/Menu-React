import React from 'react'

const ItemCanasta = ({data, index, delToCart}) => {
  return (
    <>
    <div className='item-canasta' key={index}>{data.titulo}<b>x{data.cantidad}</b>
    <button onClick={()=>delToCart(data.id)}>X</button>
    <button>-1</button>
    </div>
    </>
  )
}

export default ItemCanasta