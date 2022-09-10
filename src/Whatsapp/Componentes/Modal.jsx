import React from 'react'
import "../Estilos/Modal.css"
import { FontAwesomeIcon as Icono}  from '@fortawesome/react-fontawesome'
import {  faXmark} from '@fortawesome/free-solid-svg-icons'
const Modal = (props) => {
  
  

  return (
    <article className={`modal ${props.isOpen && "is-open"}`}>
       
      <div className={`modal-contenedor ${props.estilo}`}>
      <button onClick={props.closeModal} className="btnItem close-modal"><Icono icon= {faXmark}/></button>
        
        {props.children}

      </div>

    </article>
  )
}

export default Modal;