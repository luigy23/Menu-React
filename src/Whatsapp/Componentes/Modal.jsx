import React from 'react'
import "../Estilos/Modal.css"
const Modal = (props) => {
  
  

  return (
    <article className={`modal ${props.isOpen && "is-open"}`}>
       
      <div className='modal-contenedor '>
      <button onClick={props.closeModal} className="close-modal">X</button>
        <h3 className='modal-titulo'>Cantidad:</h3>
        {props.children}

      </div>

    </article>
  )
}

export default Modal;