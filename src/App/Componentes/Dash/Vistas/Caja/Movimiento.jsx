import React from 'react'
import { formatPrecio } from '../../../../Services/formatPrecio'
import { formatHora, formatFechaHora } from '../../../../Services/formatFecha'
const Movimiento = ({movimiento}) => {

    const tipos = {
        "Ingreso": "💵",

        "Egreso": "💸"
    }

    


  return (
    <div className='contenedorMovimiento' key={movimiento.idMovimiento}>
      <span>{tipos[movimiento.Tipo]}</span>
      <span className='etiqueta bg-scooter-200  text-scooter-600'>{formatFechaHora(movimiento.FechaHora)}</span>
      <span className='etiqueta bg-violet-200 text-violet-600' >{`Mesa:${movimiento.Mesa}`}</span>
      <span className='etiqueta bg-yellow-200 text-yellow-600' >{`${movimiento.Usuario}`}</span>
      <span className='etiqueta bg-teal-200 text-teal-600' >factura #{movimiento.NumFactura}</span>
      <span className='etiqueta bg-lime-200 text-lime-600' >propina {formatPrecio(movimiento.Propina)}</span>
      <span className='etiqueta bg-violet-200 text-violet-600' >total {formatPrecio(movimiento.Monto)}</span>
      <span className='font-semibold text-shamrock-500' >{formatPrecio(movimiento.Subtotal)}</span>
      <span className='etiqueta bg-blue-200 text-blue-600' >{movimiento.MetodoPago}</span>
      <span className='etiqueta bg-rose-200 text-rose-600' >{movimiento.Comentario}</span>
    </div>
  )
}

export default Movimiento