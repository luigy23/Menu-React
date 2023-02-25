import React from "react";
import "../Estilos/Modal.scss";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const Modal = (props) => {

  const ref = useRef(null)




  return (
    
    <article
      className={`modal backdrop-blur-sm  ${props.isOpen && "is-open"}`}
      onClick={props.closeModal}
      //ref={ref}
    >
      <div
        className={`modal-contenedor bg-white  ${props.estilo}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={props.closeModal} className="btnItem close-modal">
          <Icono icon={faXmark} />
        </button>

        {props.children}
      </div>
    </article>
  );
};

export default Modal;
