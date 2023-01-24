import React from "react";
import { useModal } from "../Hooks/useModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";
// Estilos
import "../Estilos/Menu.scss"; 

//componentes
import Producto from "../Componentes/Producto"; 
import Canasta from "../Componentes/Canasta"; 
import MenuNav from "../Componentes/MenuNav"; 
import Modal from "../Componentes/Modal"; 
import ItemCanasta from "../Componentes/ItemCanasta"; 
import Buscador from "../Componentes/Buscador"; 

// Contexto de socket
import { SocketContext } from "../Contextos/SocketContext"; 

import { buscarProductos, calcularTotal } from "../Actions/canastaActions"; // Acciones de canasta
import axios from "axios";

function Menu() {
  const state = useSelector((state) => state); //estado
  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const { productos, canasta, total, mesa, filtro } = state.canasta; //destructuración del estado

  //
  const socket = useContext(SocketContext); //traemos el socket
  //utilidades :
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mesero, setMesero] = useState("");

  //METODOS
  const enviarPedidoAPI = (pedido)=>{
    axios
      .post(process.env.REACT_APP_API + "/nuevo/pedido", pedido)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clickEnviarPedido = () => {
    
    let pedido = {};
    let mesero = "JPEREZ";

    const productosPedido = canasta.map((item) => {
      return {
        id: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
        comentario: item.comentario,
      };
    });

    pedido = { Mesero: mesero, Mesa: mesa, Productos: productosPedido };
    //console.log("pedido=", pedido);
    enviarPedidoAPI(pedido)
    closeModal();
    dispatch(calcularTotal());
  };

  const buscar = () => {
    dispatch(buscarProductos(textoBusqueda));
  };

useEffect(() => {
  console.log("cargando menu")

  return () => {
    console.log("listo menu")
  }
}, [])


  //INTERFAZ
  return (
    <>
      <MenuNav />
      <Modal estilo={"max-w-xs"}  isOpen={isOpenModal} closeModal={closeModal}>
        <input //Mesero
          type="text"
          value={mesero}
          placeholder="mesero"
          onChange={(event) => setMesero(event.target.value)} // Función para actualizar el valor del input cuando el usuario escriba
        />

        <p className="texto-confirmar">Este es tu pedido:</p>
        <ul className="lista-confirmar">
          {canasta.map((producto, index) => (
            //<li key={index}>{producto.titulo} x{producto.cantidad}</li>
            <ItemCanasta key={index} data={producto} index={index} />
          ))}
        </ul>
        <p className="texto-confirmar">Mesa: {mesa}</p>
        <button onClick={() => clickEnviarPedido()} className="btn-confimar">
          confirmar Pedido
        </button>
      </Modal>
      <div className="page-menu">
        <Buscador
          evento={() => buscar()}
          setTexto={(texto) => setTextoBusqueda(texto)}
        />
        <div className="contenedor-productos">
          {textoBusqueda.length == ""
            ? productos.map((producto) => (
                <Producto key={producto.id} data={producto} />
              ))
            : filtro.map((producto) => (
                <Producto key={producto.id} data={producto} />
              ))}
        </div>

        <Canasta producto={productos} canasta={canasta} />
        <div className="contenedor-detalles">
          <h3>Total = ${total}</h3>
          <Link className="Link" to={"/Mesas"}>
            <div>
              <h3>{mesa}</h3>
            </div>
          </Link>
          <button onClick={() => openModal()} className="btn-pedir">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
export default Menu;

//pruebas
