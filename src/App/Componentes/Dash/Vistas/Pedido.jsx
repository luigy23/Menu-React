import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../Hooks/useModal";
import Modal from "../../Modal";
import ItemPedido from "./ItemPedido";

const Pedido = ({ hora, pedido }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const { canasta } = state.canasta;
  const dispatch = useDispatch();

  const click = () => {
    openModal();
    setModal(true);
    console.log("abierto modal");
  };
  const clickDerecho = (e) =>{
    e.preventDefault();
    
  }

  const { idMesa, Productos, Usuario,idPedido, Estado } = pedido;

  return (
    <>
      <div
        onClick={click}
        onContextMenu={(e) => clickDerecho(e)}
        className="contenedorPedido w-44 hover:scale-105 transition-transform m-5 cursor-pointer"
      >
        <div   className={`xl:w-full p-4 rounded-3xl divide-y-2 text-slate-50 font-semibold ${Estado=="Pendiente" ?"cardPedidoPendiente": "cardPedidoEntregado" }`}  >
          <div name="pedidoDatos" 
          className="  w-full justify-between flex p-2 text-sm">
            <h3 >{hora} </h3>  
            <h3 >{Usuario} </h3>
          </div>
          <div name="pedidoProductos" >
            <ul className=" ">
              {Productos.map((item, index) =>
                item.Estado == "Pendiente" ? (
                  <li className="" key={index}>
                    <b>x{item.Cantidad}</b> {item.Nombre}
                  </li>
                ) : item.Estado == "Listo" ? (
                  <li
                    className=" line-through decoration-solid decoration-black	"
                    key={index}
                  >
                    <b>x{item.Cantidad}</b> {item.Nombre}
                  </li>
                ):null
              )}
            </ul>
          </div>
          <div name="pedidoComentarios" 
          className=" py-1 justify-center items-centers">
            <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ml-1 mr-1.5 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>

              <p className="text-sm whitespace-nowrap">
                {Productos.reduce(
                  (acomulador, item) => acomulador + (item.Comentario ? 1 : 0),
                  0
                )}
              </p>
            </span>
            <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
              <p className="text-sm whitespace-nowrap">
                  #{idPedido}
              </p>
            </span>
          </div>
        </div>
        <div className="Mesa rounded-md text-center bg-slate-white shadow-slate- shadow-md w-full">
          <p className="text-slate-700 font-semibold">Mesa: {idMesa}</p>
        </div>
      </div>
      

      {
      modal 
      ? 
        <Modal
          estilo={"w-4/5   "}
          isOpen={isOpenModal}
          closeModal={closeModal}
          setModal={setModal}
        >
          <div className="w-full h-full flex justify-center items-center flex-col p-4 overflow-hidden">
            <div className="pd-modal-info justify-center gap-9 w-full flex ">
              <p>{`Mesa: ${idMesa}`}</p>
              <p>{`Hora: ${hora}`}</p>
            </div>
            <div className=" w-full  space-y-2 lg:w-3/5 overflow-scroll scrollbar px-2">
              {Productos.map((item, index) => (
                <ItemPedido
                  Estado={item.Estado}
                  key={index}
                  Cantidad={item.Cantidad}
                  Nombre={item.Nombre}
                  Comentario={item.Comentario}
                  idPedido={pedido.idPedido}
                  codProducto={item.codProducto}
                ></ItemPedido>
              ))}
            </div>
          </div>
        </Modal>
       
      : ""
      }
    </>
  );
};

export default Pedido;
