import React from "react";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMinus,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../../Estilos/ItemPedido.css";
import { productoListo, productoCancelado } from "../../../Services/ApiProductos";
const ItemPedido = ({
  Cantidad,
  Nombre,
  Comentario,
  idPedido,
  codProducto,
  Estado,
  idRegistro,
}) => {
  const handleRigthClick = (e) => {
    e.preventDefault();
    alert("clock derecho");
  };
  
  const clicListo = async () => {
    try {
      await productoListo({ codProducto, idPedido, idRegistro });
    } catch (error) {
      console.log(error);
    }
  };

  const clicCancelado = async() => {
    try {
      await productoCancelado({ codProducto, idPedido, idRegistro });

    } catch (error) {
      console.log(error);
      
    }
  }

  return Estado == "Pendiente" 
  ? (
    
<div className="pedido">
  <div className="space-y-2">
    <h2 className="titulo-pedido">
      X{Cantidad} {Nombre}
    </h2>
    <p className="comentario-pedido">{Comentario}</p>
  </div>
  <div className="space-y-1">
    <button
      onClick={clicListo}
      onContextMenu={(e) => handleRigthClick(e)}
      className="btn w-full boton-listo"
    >
      Listo <Icono className="icono-listo" icon={faCheck}></Icono>
    </button>
    <button onClick={clicCancelado} className="btn w-full boton-eliminar">
      Cancelar <Icono className="icono-eliminar" icon={faXmark}></Icono>
    </button>
  </div>
</div>

  ) 
  : Estado == "Listo" ?
 
<div className="pedido bg-shamrock-300">
  <div className="space-y-2">
    <h2 className="titulo-pedido-listo  titulo-pedido line-through">
      X{Cantidad} {Nombre}
    </h2>
    <p className="comentario-pedido">{Comentario}</p>
  </div>
  <div className="space-y-1">
    Listo <Icono className="w-5" icon={faCheck}></Icono>
    {/* <button onClick={clicCancelado} className="btn w-full boton-eliminar">
      Cancelar <Icono className="w-5" icon={faXmark}></Icono>
    </button> */}
  </div>
</div>
  : Estado == "Cancelado" ?
  <div className="pedido bg-red-300">
    <div className="space-y-2">
      <h2 className="titulo-pedido-listo  titulo-pedido line-through">
        X{Cantidad} {Nombre}
      </h2>
      <p className="comentario-pedido">{Comentario}</p>
    </div>
    <div className="space-y-1">
      Cancelado <Icono className="w-5" icon={faXmark}></Icono>

    </div>
  </div>
  : null;
 
};

export default ItemPedido;
