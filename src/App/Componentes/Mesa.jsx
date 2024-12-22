import React from "react";
import { useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import { seleccionarMesa, actualizarCanasta, calcularTotal, vaciarCanasta } from "../Actions/canastaActions";
import { ToastContainer, toast } from "react-toastify";
import "../Estilos/Mesas.scss";
import { traerProductosMesa } from "../Services/ApiMesas";
import ca from "date-fns/esm/locale/ca/index.js";

const Mesa = ({Mesa}) => {
  const { idMesa, Descripcion, Estado } = Mesa;
  // Define dispatch para enviar una acción al store de Redux
  const dispatch = useDispatch();

  // Define las funciones para los eventos click de la mesa
  const click = () => {
   


    Estado == "Disponible" ? disponible() : ocupada();

  };


  const disponible = () => {
    console.log("Mesa disponible");
    dispatch(seleccionarMesa(Mesa));
    // dispatch(vaciarCanasta())
    dispatch(calcularTotal())
  }
  const bloqueada = () => {

  };

  const ocupada = () => {
    traerProductosMesa(idMesa).then((productos) => {
      // dispatch(vaciarCanasta());
      dispatch(seleccionarMesa(Mesa));
      dispatch(calcularTotal());

    })
  }

  // Define la constante para el color del estado
  const estadoColorMap = {
    Disponible: "text-emerald-400",
    Ocupado: "text-red-400",
    "Sin Pagar": "text-yellow-400",
    "Inactiva": "hidden"
  };


  const color = estadoColorMap[Estado];

  // Define el contenido de la mesa
  const MesaContent = (
    <div
            onClick={click}
            className={`flex items-start w-48 rounded-xl bg-white p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform 
            ${Estado == "Inactiva" ? "hidden" : ""}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {" "}
                <g>
                  {" "}
                  <path fill="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M21 2v20h-2v-7h-4V8a6 6 0 0 1 6-6zm-2 2.53C18.17 5 17 6.17 17 8v5h2V4.53zM9 13.9V22H7v-8.1A5.002 5.002 0 0 1 3 9V3h2v7h2V3h2v7h2V3h2v6a5.002 5.002 0 0 1-4 4.9z" />{" "}
                </g>{" "}
              </svg>
            </div>
    
            <div className="ml-4  ">
              <h2 className="font-semibold">{Descripcion}</h2>
              <p className={` text-xs text-slate-600`}>id:{idMesa}</p>
              <p className={`mt-2 text-sm font-semibold ${color}`}>{Estado}</p>
            </div>
          </div>
    
    )

  return  (
    <Link className="Link" to={"/Menu"}>
      {MesaContent}
    </Link>
  ) 


};




export default Mesa;
