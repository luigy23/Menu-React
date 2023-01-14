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

  const { idMesa, Productos, Usuario } = pedido;

  return (
    <>
      <div
        onClick={click}
        className="contenedorPedido w-44 hover:scale-105 transition-transform m-5 cursor-pointer"
      >
        <div className=" cardPedido divide-y-2 ">
          <div className=" pedidoDatos w-full justify-between flex p-2 text-sm">
            <h3 className=" font-semibold text-slate-50">{hora} </h3>
            <h3 className=" font-semibold text-slate-50">{Usuario} </h3>
          </div>

          <div className="pedidoProductos">
            <ul className="text-slate-50 font-semibold ">
              {Productos.map((item, index) => (
                <li className="" key={index}>
                  <b>x{item.Cantidad}</b> {item.Nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="pedidoComentarios">
            {Productos.map((item, index) => (item.Comentario ? "si " : ""))}
          </div>
        </div>
        <div className="Mesa rounded-md text-center bg-slate-white shadow-slate- shadow-md w-full">
          <p className="text-slate-700 font-semibold">Mesa: {idMesa}</p>
        </div>
      </div>
      {modal ? (
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
      ) : (
        ""
      )}
    </>
  );
};

export default Pedido;
