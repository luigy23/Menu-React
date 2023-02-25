import React from "react";
import { useModal } from "../Hooks/useModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrecio } from "../Services/formatPrecio";
// Estilos
import "../Estilos/Menu.scss";

//componentes
import Producto from "../Componentes/Producto";
import Modal from "../Componentes/Modal";
import ItemCanasta from "../Componentes/ItemCanasta";
import HeaderMenu  from "../Componentes/HeaderMenu";
import Buscador from "../Componentes/Buscador";

// Contexto de socket

import {  calcularTotal } from "../Actions/canastaActions"; // Acciones de canasta
import axios from "axios";
import MenuCategorias from "../Componentes/MenuCategorias";

//IConos
import Icarro from "../Assets/Icons/ICarro";

function Menu() {
  const state = useSelector((state) => state); //estado
  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const { productos, canasta, total, mesa, filtro } = state.canasta; //destructuración del estado
  const [productosMenu, setProductosMenu] = useState([]); //productos del menu
  const [filtroActivo,setFiltroActivo] = useState(false); //texto de busqueda

  //
  //utilidades :
  const [isOpenModal, openModal, closeModal] = useModal(false);
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
        cantidad: item.Cantidad,
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

  useEffect(() => {
    setProductosMenu(productos);

  }, [productos]);

  const buscar = (texto) => {
    if (texto === "") {
      setProductosMenu(productos);
      console.log("filtro activo", filtroActivo);
      return;
    }
    const productosF = productos.filter((producto) => {
      return producto.Nombre.toLowerCase().includes(texto.toLowerCase());
    });

    setProductosMenu(productosF);
  };
  const filtrarCategoria = (idCategoria) => {
    if (idCategoria === "all") {
      setProductosMenu(productos);
      return;
    }
    const productosF = productos.filter((producto) => {
      return producto.idCategoria === idCategoria;
    });
    setProductosMenu(productosF);
  };



  //INTERFAZ
  return (
    <>
<Modal estilo={"max-w-lg bg-opacity-90"} isOpen={isOpenModal} closeModal={closeModal}>
<div className="flex flex-col px-2">
<div className="flex justify-center text-center gap-3 py-2 ">
  <span className="bg-elm-200 px-2 rounded-md">Mesa: {mesa}</span>
  <span className="bg-shamrock-300 px-2 rounded-md">{formatPrecio(total)}</span>
  </div>

  <ul className="lista-confirmar">
    {canasta.map((producto, index) => (
      //<li key={index}>{producto.titulo} x{producto.cantidad}</li>
      <ItemCanasta key={index} data={producto} index={index} />
    ))}
  </ul>


</div>


  <button onClick={() => clickEnviarPedido()} className="btn-confimar">
    confirmar Pedido
  </button>
  </Modal>

    <div className="w-full h-8 bg-slate-300 items-center px-4 py-2 flex ">
      Menu
    </div>
    <HeaderMenu>
    <Buscador buscar={buscar} />
    <MenuCategorias filtrar={filtrarCategoria}/>
    </HeaderMenu>
    <div className="flex flex-col items-center justify-start bg-white min-h-screen">
      <div className="productosContenedor flex flex-wrap gap-2 py-2 ">
        {
        productosMenu.map((producto) => (
            <Producto
              key={producto.codProducto}
              producto={producto}
              openModal={openModal}
            />
          ))
        }

      </div>

    </div>

    <div className="w-full  bg-slate-50 nm-inset-white-sm items-center px-4 py-2 flex sticky bottom-0">
      <nav className="w-full ">
        <ul className="menuIconos ">
          <li className="bg-shamrock-500 text-white">
              <button onClick={() => openModal()} className="btnIcon">
              <span className=" bg-scooter-700 text-xs w-4 h-4 rounded-full flex text-center justify-center items-center   ">{canasta.reduce((acc, item) => acc + item.Cantidad, 0)}</span>
              <Icarro fill={"#fff"} />
              <span className="">Canasta</span>
               
              
              </button>
            
          </li>
          <li className="">
          <Link className="Link" to={"/Mesas"}>
            <button onClick={() => openModal()} className="btnIcon">

             <span className="font-medium">Mesa: <span className="font-semibold text-shamrock-600"> #{mesa}</span> </span>
            </button>
            </Link>
          
        </li>
        </ul>
      </nav>
    </div>
    <ToastContainer />
    </>
  );
}
export default Menu;

//pruebas


