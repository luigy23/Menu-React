import React from 'react'
import Mesa from '../Componentes/Mesa'

export const Mesas = () => {
  return (
    <>
    <div className='contenedor-mesas'>
    <Mesa nombre= "Mesa 1" estado="libre"></Mesa>
    <Mesa nombre= "Mesa 2" estado="libre"></Mesa>
    <Mesa nombre= "Mesa 3" estado="ocupado"></Mesa>
    <Mesa nombre= "Mesa 4" estado="libre"></Mesa>
    <Mesa nombre= "Mesa 5" estado="pendiente"></Mesa>
    </div>
    </>
  )
}
