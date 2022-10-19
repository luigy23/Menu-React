import React from "react";
import '../Estilos/Producto.css';
import Modal from "./Modal";
import { useState } from "react";
import { useModal } from "../Hooks/useModal";


const Producto=({data, add_to_cart}) =>{
  const [cantidad,setCantidad]=useState(1)
  
  const [isOpenModal,openModal,closeModal] = useModal(false);

  



  //metodos
  const click = ()=>{
    
    openModal()
  }
  const formatPrecio = (precio) =>{

   return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)
  }

  const confirmarClick = ()=>{

    add_to_cart(data.id, parseInt(cantidad))
    closeModal()


  }

  return ( 
  <>
  <div onClick={click} id={data.id} className="contenedor-p">

    <img className="imgProducto" src={data.img} alt="Imagen" />
    <h3>{data.titulo}</h3>
    
    <p className="producto-precio">{formatPrecio(data.precio)}</p>
    
    
    </div>
    
   
    <Modal isOpen={isOpenModal}
    closeModal={closeModal}
    
    >
      <h3 className='modal-titulo'>Cantidad:</h3>
    <div className="descripcion-contenedor">
       <p className="producto-descripcion">{data.descripcion}</p></div> 
   
    <input onChange ={(e)=>{setCantidad(e.target.value)}} className="cantidad" type="number" placeholder="Cantidad"  />
    <button onClick={confirmarClick} className="btn-confimar">confirmar</button>
    </Modal>
    

 


  </>
     );
}

export default Producto;