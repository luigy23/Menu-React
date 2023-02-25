import React, { useEffect, useState } from 'react'
import { traerCategorias } from '../Services/ApiCategorias'
const MenuCategorias = ({filtrar}) => {

const [categorias, setCategorias] = useState([])
useEffect(() => {
    traerCategorias().then((categorias) => {
        setCategorias(categorias)
        console.log(categorias)
        })
}, [])

  return (
       /* Menu de navegacion horizontal deslizables: */
       <nav className='w-full '>
        <ul className="flex flex-row justify-start md:justify-center px-2 gap-2 items-center overflow-scroll scrollbar-hide ">
        <li key="all" 
                onClick={() => filtrar("all")}
                className="bg-rhino-100 hover:bg-rhino-500 hover:text-rhino-50 active:bg-rhino-900 active:text-rhino-50 transition-all whitespace-nowrap font-medium cursor-pointer px-3 py-1 rounded-full text-center">
                   Todas
                </li>
            {categorias.map((categoria, index) => (
                <li key={index} 
                onClick={() => filtrar(categoria.idCategoria)}
                className="bg-rhino-100 hover:bg-rhino-500 hover:text-rhino-50 active:bg-rhino-900 active:text-rhino-50 transition-all whitespace-nowrap font-medium cursor-pointer px-3 py-1 rounded-full text-center">
                   {categoria.Nombre}
                </li>
            ))}


        </ul>
        
       </nav>
  )
}

export default MenuCategorias