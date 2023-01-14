import React from 'react'
import { useSelector } from 'react-redux';
import Mesa from '../Componentes/Mesa'
import MenuNav from "../Componentes/MenuNav";

export const Mesas = () => {
  const state = useSelector((state) => state);
  const { mesa } = state.canasta;


  return (
    <>
    <MenuNav/>
    <div className='justify-center items-center text-center w-full bg-slate-700 h-screen'>
    <h1 className='text-xl'>{mesa}</h1>
    
    <div className='contenedor-mesas space-x-2'>
    <Mesa nombre= "1" estado="libre"></Mesa>
    <Mesa nombre= "2" estado="libre"></Mesa>
    <Mesa nombre= "3" estado="ocupado"></Mesa>
    <Mesa nombre= "4" estado="libre"></Mesa>
    <Mesa nombre= "5" estado="pendiente"></Mesa>
    </div>
    </div>
    </>
  )
}
