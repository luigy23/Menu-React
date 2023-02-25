import React from 'react'
import { useSelector } from 'react-redux';
import Mesa from '../Componentes/Mesa'
import MenuNav from "../Componentes/MenuNav";
import { traerMesas } from '../Services/ApiMesas';
import { useEffect, useState } from 'react';
import { ioSocket } from '../Socket';

export const Mesas = () => {
  const state = useSelector((state) => state);
  const { mesa } = state.canasta;
  const [mesas, setMesas]= useState([])

  const cargarMesas = () =>{
    traerMesas()
    .then((mesas) => {
      setMesas(mesas)
    })

    }
  

  useEffect(() => {
    
    cargarMesas()

    ioSocket.on("mesas", traerMesas);
    //request a la api

    
    ;

    return () => {
      ioSocket.off("mesas", traerMesas);
    };



 
   }, []);


  return (
    <>
    <MenuNav/>



    <div className='justify-center items-center text-center w-full bg-slate-700 h-screen py-8'>
    <h1 className='text-xl text-slate-50'>{mesa}</h1>
    
    <div className='contenedor-mesas space-x-2 space-y-1'>
      {
         mesas.map((mesa, index) => (
          <Mesa
            key={index}
            Mesa={mesa}
          />))
      }
 
    </div>
    </div>
    </>
  )

    }