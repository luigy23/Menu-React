import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../Hooks/useModal";
import Modal from "../../Modal";

const Pedido = ({ mesero, hora, mesa, productos }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const state = useSelector((state) => state);
  const { canasta } = state.canasta;
  const dispatch = useDispatch();

  const click = () => {
    openModal();
    console.log("abierto modal")
  };

  return (
    <>


    <div onClick={ click} className="contenedorPedido w-44 hover:scale-105 transition-transform m-5 cursor-pointer">
      <div className=" cardPedido divide-y-2 ">
        <div className=" pedidoDatos w-full justify-between flex p-2 text-sm">
          <h3 className=" font-semibold text-slate-50">{hora} </h3>
          <h3 className=" font-semibold text-slate-50">{mesero} </h3>
        </div>

        <div className="pedidoProductos">
          <ul className="text-slate-50 font-semibold ">
            {productos.map((item, index) => (
              <li className="" key={index}>
                <b>x{item.Cantidad}</b> {item.Nombre}
              </li>
            ))}
          </ul>
        </div>
        <div className="pedidoComentarios">
          {productos.map((item, index) =>
          item.Comentario ? "si ":""
          )}
        </div>
      </div>
      <div className="Mesa rounded-md text-center bg-slate-white shadow-slate- shadow-md w-full">
        <b className="text-slate-700">{mesa}</b>
      </div>
    </div>

    <Modal estilo={"w-4/5"} isOpen={isOpenModal} closeModal={closeModal}  >
     <h1>holaaa</h1>
    </Modal>
    
    </>
  );
};

export default Pedido;
