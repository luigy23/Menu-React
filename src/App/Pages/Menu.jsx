import React from "react";
import { useModal } from "../Hooks/useModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import { buscarProductos, calcularTotal } from "../Actions/canastaActions"; // Acciones de canasta
import axios from "axios";

function Menu() {
  const state = useSelector((state) => state); //estado
  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const { productos, canasta, total, mesa, filtro } = state.canasta; //destructuración del estado

  //
  //utilidades :
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mesero, setMesero] = useState("");
  // Mensajes Toast
 

  //METODOS
  const enviarPedidoAPI = async (pedido) => {
    try {
      const response = await toast.promise(
        axios.post(process.env.REACT_APP_API + "/nuevo/pedido", pedido),
        {
          pending: "Promise is pending",
          success: "Pedido Enviado 👌",
          error: {render({data}){
            return `Error: ${data.response.data}`
          }},
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error al enviar pedido: ", error);
    }
  };

  const clickEnviarPedido = () => {
    let pedido = {};
    let mesero = "JPEREZ";

    const productosPedido = canasta.map((item) => {
      return {
        id: item.codProducto,
        cantidad: item.cantidad,
        precio: item.Precio,
        comentario: item.comentario,
        
      };
    });

    pedido = { Mesero: mesero, Mesa: mesa, Productos: productosPedido, Total: total };
    //console.log("pedido=", pedido);
    enviarPedidoAPI(pedido);
    closeModal();
    dispatch(calcularTotal());
  };

  const buscar = () => {
    dispatch(buscarProductos(textoBusqueda));
  };

  useEffect(() => {
    console.log("cargando menu");

    return () => {
      console.log("listo menu");
    };
  }, []);

  //INTERFAZ
  return (
    <>
      <MenuNav />
      <Modal estilo={"max-w-xs"} isOpen={isOpenModal} closeModal={closeModal}>
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
      <div className="page-menu ">
        <Buscador
          evento={() => buscar()}
          setTexto={(texto) => setTextoBusqueda(texto)}
        />
        <div className="contenedor-productos ">
          {textoBusqueda.length == ""
            ? productos.map((producto) => (
                <Producto key={producto.codProducto} producto={producto} />
              ))
            : filtro.map((producto) => (
                <Producto key={producto.codProducto} producto={producto} />
              ))}
        </div>

        <Canasta producto={productos} canasta={canasta} />
        <ToastContainer autoClose={1600} />
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
