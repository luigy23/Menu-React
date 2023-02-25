import React from "react";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Estilos/NavMenu.scss";
import { useRef } from "react";
const Buscador = ({buscar}) => {

  const ref = useRef(null)

  return (
    <div className="flex w-full gap-1 md:max-w-md justify-center items-center">
     
      <div className="flex w-full ">
       
        <input   
        ref={ref}

        onChange={(e) => {buscar(e.target.value); console.log(e.target.value)}}
      
       
        type="text" placeholder="Busqueda..." 
        className=" rounded-full bg-stone-200  px-2 text-center w-full
        focus:bg-stone-50
         focus:ring-2 outline-none
         transition-all ease-in-out
        " />
      
      </div>
 
      <button
        onClick={() => {buscar(""); ref.current.value = ""}}
        className="cursor-pointer hover:text-red-600"
        >
          <Icono className="text-red-400" icon={faXmark}></Icono>
      </button>

    </div>
  );
};

export default Buscador;

{/* <input
id="buscador"
className="Buscar"
onChange={(e) => enter(e)}
onKeyDown={(e) => enter(e)}
type="text"
placeholder="Escribe aquí el producto"
></input>
<button className="btnItem">
<Icono onClick={() => limpiar()} icon={faXmark}></Icono>
</button> */}