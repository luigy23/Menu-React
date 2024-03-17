import React from "react";
import { useModal } from "../../../../Hooks/useModal";
import { imagenProducto } from "../../../../Services/ApiProductos";
import { formatPrecio } from "../../../../Services/formatPrecio";
import Modal from "../../../Modal";

import Formulario from "./Formulario";

export const ProductoItem = ({ producto }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const {
    codProducto,
    Nombre,
    Descripcion,
    idCategoria,
    Precio,
    Estado,
    Imagen,
    Stock,
  } = producto;

  return (
    <>
      <div
        onClick={openModal}
        className="bg-white shadow-lg  rounded-lg  flex  w-52 overflow-hidden justify-start items-center hover:scale-105 transition-all cursor-pointer  "
      >
        <img
          className="object-cover w-2/5 h-full select-none"
          src={Imagen}
          alt={Nombre}
        />
        <div className="py-2 text-sm w-3/5 ">
          <h2 className="font-semibold">{Nombre}</h2>
          <p>{formatPrecio(Precio)}</p>

          <span className={Stock>0? "inline-flex items-center justify-center rounded-full bg-emerald-400 px-2.5 py-0.2 text-white"
          : "inline-flex items-center justify-center rounded-full bg-red-400 px-2.5 py-0.2 text-white " }>
            <p>Stock: {Stock}</p>
          </span>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          estilo={"w-4/5 overflow-scroll scrollbar"}
          isOpen={isOpenModal}
          closeModal={closeModal}
        >
          <div className="   flex flex-column flex-wrap  w-full justify-center p-2 gap-1">
            {/* <FormProducto/> */}
            <Formulario data={producto}></Formulario>
            {/* <ToggleButton/> */}
          </div>
        </Modal>
      )}
    </>
  );
};
