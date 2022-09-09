import React from 'react'
import "../Estilos/Modal.css"
import { FontAwesomeIcon as Icono}  from '@fortawesome/react-fontawesome'
import {  faXmark} from '@fortawesome/free-solid-svg-icons'
const Modal = (props) => {
  
  

  return (
    <article className={`modal ${props.isOpen && "is-open"}`}>
       
      <div className='modal-contenedor '>
      <button onClick={props.closeModal} className="btnItem close-modal"><Icono icon= {faXmark}/></button>
        <h3 className='modal-titulo'>Cantidad:</h3>
        {props.children}

      </div>

    </article>
  )
}

export default Modal;