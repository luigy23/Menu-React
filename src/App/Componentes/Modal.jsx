import React from 'react'
import "../Estilos/Modal.scss"
import { FontAwesomeIcon as Icono}  from '@fortawesome/react-fontawesome'
import {  faXmark} from '@fortawesome/free-solid-svg-icons'
const Modal = (props) => {
  
  const stop=(e)=>{

  }

  return (
    <article className={`modal ${props.isOpen && "is-open"}`} onClick={props.closeModal}>
       
      <div className={`modal-contenedor ${props.estilo}`} onClick={(e)=>e.stopPropagation()}>
      <button onClick={props.closeModal} className="btnItem close-modal"><Icono icon= {faXmark}/></button>
        
        {props.children}

      </div>

    </article>
  )
}

export default Modal;