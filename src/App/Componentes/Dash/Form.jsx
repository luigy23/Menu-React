import React from 'react'
import axios from "axios";
import { useState } from "react";
const Form = () => {
    const [datos, setDatos] = useState({
        id: "",
        titulo: "",
        precio: 0,
        descripcion: "",
        img: "",
      });
    
      const [id, setId] = useState("")
      const [titulo, setTitulo] = useState("")
      const [precio, setPrecio] = useState("")
      const [descripcion, setDescripcion] = useState("")
      const [img, setImg] = useState("")
    
    const manejarCambio=()=>{
    
    }
      const confirmarClick = (e) => {
    
        e.preventDefault();
        console.log(e);
        console.log(datos);
      };
    
      const manejarEnvio = (e) => {
        const datosForm = {
          id: e.target[0].value,
          titulo: e.target[1].value,
          precio: e.target[2].value,
          descripcion: e.target[3].value,
          img: e.target[4].value,
        };
        console.log(datosForm)
        setDatos(datosForm);
    
        confirmarClick(e);
      };
  return (
    <form className="form-crud" onSubmit={manejarCambio}>
        <input type="text" name="id" placeholder="id" value={datos.id} />
        <input type="text" name="titulo" placeholder="Nombre" value={datos.titulo} />
        <input type="text" id="precio" placeholder="Precio"value={datos.precio} />
        <textarea
          className="txt"
          name="descripcion"
          cols="10"
          rows="5"
          placeholder="Descripcion"
          value={datos.descripcion}
        ></textarea>
        <input
          type="text"
          name="imagen"
          placeholder="imagen"
          cols="40"
          rows="5"
          value={datos.img}
        />

        <button>confirmar</button>
      </form>
  )
}

export default Form