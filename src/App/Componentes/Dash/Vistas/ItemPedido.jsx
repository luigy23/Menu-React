import React from "react";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMinus,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ItemPedido = ({
  Cantidad,
  Nombre,
  Comentario,
  idPedido,
  codProducto,
  Estado,
}) => {
  const handleRigthClick = (e) => {
    e.preventDefault();
    alert("clock derecho");
  };
  
  const productoListo = () => {
    axios
      .post(process.env.REACT_APP_API + "/ProductoListo", {
        codProducto: codProducto,
        idPedido: idPedido,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return Estado == "Pendiente" ? (
    
    <div className="border-solid border-2 space-y-2  justify-between border-stone-400 py-2 px-6 rounded-xl flex flex-wrap w-full">
      <div className="space-y-2">
      
        <h2 className="font-bold text-stone-900 text-lg">
          X{Cantidad} {Nombre}
        </h2>
        <p className="font-semibold text-stone-500 ">{Comentario}</p>
      </div>
      <div className="space-y-1">
        <button
          onClick={productoListo}
          onContextMenu={(e) => handleRigthClick(e)}
          className="btn w-full bg-green-500 hover:bg-emerald-400 "
        >
          Listo <Icono className="w-5" icon={faCheck}></Icono>
        </button>
        <button className="btn w-full bg-red-500 hover:bg-red-400 ">
          Eliminar <Icono className="w-5" icon={faXmark}></Icono>
        </button>
      </div>
    </div>
  ) : 
    <div className="border-solid border-2 space-y-2  justify-between bg-slate-300 border-stone-400 py-2 px-6 rounded-xl flex flex-wrap w-full">
      <div className="space-y-2">
     
        <h2 className="font-bold text-stone-700 text-lg line-through">
          X{Cantidad} {Nombre}
        </h2>
        <p className="font-semibold text-stone-500 ">{Comentario}</p>
      </div>
      <div className="space-y-1">
        Listo <Icono className="w-5" icon={faCheck}></Icono>
        <button className="btn w-full bg-red-500 hover:bg-red-400 ">
          Eliminar <Icono className="w-5" icon={faXmark}></Icono>
        </button>
      </div>
    </div>
  
    "eaaa"
 
};

export default ItemPedido;
