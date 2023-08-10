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
    <span className='etiqueta bg-teal-200 text-teal-600' >#{movimiento.NumFactura}</span>
    <span className='font-semibold text-shamrock-500' >{formatPrecio(movimiento.Monto)}</span>
</div>
  )
}

export default Movimiento