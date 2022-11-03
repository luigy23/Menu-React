import React from 'react'
import { useSelector } from 'react-redux';
import Mesa from '../Componentes/Mesa'

export const Mesas = () => {
  const state = useSelector((state) => state);
  const { mesa } = state.canasta;


  return (
    <>
    <h1>{mesa}</h1>
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
