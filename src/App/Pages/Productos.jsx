import React from "react";
import "../Estilos/Productos.scss";
import axios from "axios";
import { useState } from "react";
const Productos = () => {
  const [datos, setDatos] = useState({
    titulo: "pollo",
    img: "",
    id: "",
    precio: 0,
    descripcion: "",
  });

  const confirmarClick = (e) => {
    e.preventDefault();
    console.log(datos)
     
   
  
  };

  const manejarCambio = (e) =>{
    setDatos({...datos,titulo: e.target.value })
    
  }

  return (
    <div className="page-productos">
      <h1>Productos</h1>
      <form onSubmit={(e) => confirmarClick(e)}>
        <input className="cantidad" type="text" name="id" placeholder="id" />
        <input
          className="cantidad"
          type="text"
          name="titulo"
          placeholder="Nombre"
          onChange={(e)=>manejarCambio(e)}
        />
        <input
          className="cantidad"
          type="text"
          name="precio"
          placeholder="Precio"
        />
        <textarea
          className="cantidad"
          name="descripcion"
          cols="10"
          rows="5"
        ></textarea>
        <input
          className="cantidad"
          type="text"
          name="imagen"
          placeholder="imagen"
          cols="40"
          rows="5"
        />

        <button
         
        >
          confirmar
        </button>
      </form>
    </div>
  );
};

export default Productos;
