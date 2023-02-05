import React, { useEffect, useState } from "react";
import { traerProductos } from "../../../../Services/ApiProductos";
import { ProductoItem } from "./ProductoItem";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMinus,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../../Hooks/useModal";
import Modal from "../../../Modal";
import Formulario from "./Formulario";
import { ioSocket } from "../../../../Socket";





export const Productos = ({}) => {

  const recibirActualización = () =>{
    cargadeProductos()
    console.log("Productos Actualizados")
   
  }

const nuevoProducto= {
  codigo: "" ,
  nombre: "",
  descripcion: "",
  precio: "",
  estado: "",
  imagen: ""
}
const [productos, setProductos] = useState([])
const [isOpenModal, openModal, closeModal] = useModal(false);

const cargadeProductos = () =>{
  traerProductos().then(data => setProductos(data))
}


  useEffect(()=>{
    ioSocket.on("productos",recibirActualización);
    cargadeProductos()

    return () => {
      ioSocket.off("productos", recibirActualización);
    };

  },[])


  return (
    <>
    <div className="bg-slate-50 min-h-full w-full text-2xl items-center justify-center  flex-column flex   flex-wrap p-5">
      <div className=" w-full " >
      <button 
      onClick={openModal}
      className="btn text-base bg-emerald-400 shadow-sm  text-white hover:shadow-md hover:transition-shadow ease-in-out active:shadow-sm "
      >{<span > <Icono icon={faPlus}/> </span>} Nuevo Producto</button>
      </div>
      <div className=" flex w-full
      h-full
      flex-wrap justify-start 
      items-center content-start 
      p-3 gap-2 "> 

      {
        productos.map((producto, index)=>(
          <ProductoItem  key={index} producto={producto}/>

        ))

      }


      </div>
      


    </div>

      {isOpenModal?
      <Modal estilo={"w-4/5 overflow-scroll scrollbar"} isOpen={isOpenModal} closeModal={closeModal}>
        asas
        <Formulario data={nuevoProducto} nuevo={true} />
      </Modal>
      :""
      }
    </>
  );
};
