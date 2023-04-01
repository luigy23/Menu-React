import React from "react";
import "../Estilos/Producto.scss";
import Modal from "./Modal";
import { useState } from "react";
import { useModal } from "../Hooks/useModal";
import { useDispatch } from "react-redux";
import { addToCart, calcularTotal } from "../Actions/canastaActions";
import { formatPrecio } from "../Services/formatPrecio";
import { ToastContainer, toast } from "react-toastify";
const Producto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState("");
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const dispatch = useDispatch();
  //metodos
  const click = () => {
    openModal();  
  };

  const confirmarClick = (e) => {
    //console.log(producto)
    // add_to_cart(producto.id, parseInt(cantidad))
    e.preventDefault();

    toast.success("Producto agregado al carrito", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
     
      
      })
      dispatch(addToCart(producto.codProducto, parseInt(cantidad), 0, comentario))



    closeModal();
    dispatch(calcularTotal());
  };

  return (
    <>
      <div onClick={click} id={producto.codProducto} className="contenedor-p ">
        <div className="w-4/5 overflow-hidden max-sm:w-3/4 items-center">
        <img className="  imgProducto " src={producto.Imagen} alt="Imagen" />
        </div>
        <h3 className="titulo">{producto.Nombre}</h3>
        <p className="producto-precio">{formatPrecio(producto.Precio)}</p>
      </div>
      
      {
      
      isOpenModal ? (
        <Modal estilo={"max-w-xs"} isOpen={isOpenModal} closeModal={closeModal}>
          <h3 className="modal-titulo py-3">{producto.Nombre}</h3>
          <div className="descripcion-contenedor">
            <p className="producto-descripcion">{producto.Descripcion}</p>
          </div>
          <form className="formulario" onSubmit={confirmarClick}>
            <input
              onChange={(e) => {
                setCantidad(e.target.value);
              }}
              min="1"
              className="cantidad"
              type="number"
              placeholder="Cantidad"
            />
            <input
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
              className="cantidad"
              type="text"
              placeholder="comentario"
            />
            <button onClick={confirmarClick} className="btn-confimar ">
              confirmar
            </button>
          </form>
        </Modal>
      ) : (
        ""
      )}
 
    </>
  );
};

export default Producto;
