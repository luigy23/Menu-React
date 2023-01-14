import React from "react";
import { useDispatch } from "react-redux";
import { redirect, Link } from "react-router-dom";
import { seleccionarMesa } from "../Actions/canastaActions";
import "../Estilos/Mesas.scss";
const Mesa = ({ nombre, estado }) => {
  const dispatch = useDispatch();

  const click = () => {
    dispatch(seleccionarMesa(nombre));
  };

  const color = estado=="libre"? "text-emerald-400": "text-red-400"
  return (
  
    <Link className='Link' to={"/"}>
      <div onClick={()=> click()} 
      className={`flex items-start rounded-xl bg-white p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform`}>
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

        <div className="ml-4">
          <h2 className="font-semibold">Mesa {nombre}</h2>
          <p className={`mt-2 text-sm font-semibold ${color}`}>{estado}</p>
        </div>
      </div>
      </Link>

  );
};

export default Mesa;
