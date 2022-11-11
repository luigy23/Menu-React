import React from "react";
import "../Estilos/Producto.scss";
import Modal from "./Modal";
import { useState } from "react";
import { useModal } from "../Hooks/useModal";
import { useDispatch } from "react-redux";
import { addToCart, calcularTotal } from "../Actions/canastaActions";

const Producto = ({ data }) => {
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState("");
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const dispatch = useDispatch();
  //metodos
  const click = () => {
    openModal();
  };
  const formatPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(precio);
  };

  const confirmarClick = () => {
    //console.log(data)
    // add_to_cart(data.id, parseInt(cantidad))
    dispatch(addToCart(data.id, parseInt(cantidad)));
    closeModal();
    dispatch(calcularTotal());
  };

  return (
    <>
      <div onClick={click} id={data.id} className="contenedor-p">
        <img className="imgProducto" src={data.img} alt="Imagen" />
        <h3 className="titulo">{data.titulo}</h3>
        <p className="producto-precio">{formatPrecio(data.precio)}</p>
      </div>

      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <h3 className="modal-titulo">Cantidad:</h3>
        <div className="descripcion-contenedor">
          <p className="producto-descripcion">{data.descripcion}</p>
        </div>

        <input
          onChange={(e) => {
            setCantidad(e.target.value);
          }}
          className="cantidad"
          type="number"
          placeholder="Cantidad"
        />
        <input
        
          className="cantidad"
          type="text"
          placeholder="comentario"
        />
        <button onClick={confirmarClick} className="btn-confimar">
          confirmar
        </button>
      </Modal>
    </>
  );
};

export default Producto;
