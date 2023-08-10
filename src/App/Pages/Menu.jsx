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
import HeaderMenu from "../Componentes/HeaderMenu";
import Buscador from "../Componentes/Buscador";
import MenuNav from "../Componentes/MenuNav";
// Contexto de socket

import { calcularTotal, seleccionarMesa, vaciarCanasta } from "../Actions/canastaActions"; // Acciones de canasta
import axios from "axios";
import MenuCategorias from "../Componentes/MenuCategorias";
import { nuevoPedido, añadirProductosPedido } from "../Services/ApiPedidos";
//IConos
import Icarro from "../Assets/Icons/ICarro";
import Icuenta from "../Assets/Icons/Icuenta";

function Menu() {
  const state = useSelector((state) => state); //estado
  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const { productos, canasta, total, mesa, filtro } = state.canasta; //destructuración del estado
  const {user} = state.usuario;
  const [productosMenu, setProductosMenu] = useState([]); //productos del menu
  const [filtroActivo, setFiltroActivo] = useState(false); //texto de busqueda

  //
  //utilidades :
  const [isOpenModal, openModal, closeModal] = useModal(false);
  // Mensajes Toast

  //METODOS
  const enviarPedidoAPI = async (pedido) => {

    if (pedido.Productos.length === 0) {
      toast.error("No hay productos en el pedido");
      return;
    }
    if (mesa.Estado === "Ocupado" || mesa.Estado === "Sin Pagar") {
      try {
        const response = await toast.promise(
          añadirProductosPedido(mesa.idMesa,pedido.Productos),
          {
            pending: "Promise is pending",
            success: "Pedido Enviado 👌",
            error: {
              render({ data }) {
                return `Error: ${data.response.data}`;
              },
            },
          }
        );
        dispatch(vaciarCanasta());
        dispatch(calcularTotal());

        console.log("respuesta de añadir productos: ", response);
        
    }catch (error) {
      console.log("error al enviar pedido: ", error);
    }
    return;
  }

    try {
      const response = await toast.promise(
        nuevoPedido(pedido),
        {
          pending: "Promise is pending",
          success: "Pedido Enviado 👌",
          error: {
            render({ data }) {
              return `Error: ${data.response.data}`;
            },
          },
        }
       
      );
      console.log("respuesta de nuevo pedido: ", response);
      dispatch(seleccionarMesa({idMesa:mesa.idMesa,Estado:"Ocupado"}))
      dispatch(vaciarCanasta());
      dispatch(calcularTotal());
      
    } catch (error) {
      console.log("error al enviar pedido: ", error);
    }
  };

  const clickEnviarPedido = () => {
    let pedido = {}; //objeto pedido

    let mesero = user;
    //alert("tengo esta mesa: " + mesa.Estado);

    const productosPedido = canasta.map((item) => { //recorrer canasta y crear un objeto con los datos del pedido
      return {
        id: item.codProducto,
        cantidad: item.Cantidad,
        precio: item.Precio,
        comentario: item.comentario,
      };
    });

    pedido = { //objeto pedido con los datos del pedido
      Mesero: mesero,
      Mesa: mesa.idMesa,
      Productos: productosPedido,
      Total: total,
    };
    //console.log("pedido=", pedido);
    enviarPedidoAPI(pedido); //enviar pedido a la API
    closeModal(); //cerrar modal
    dispatch(calcularTotal()); //calcular total
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
      <Modal
        estilo={"max-w-lg bg-opacity-90"}
        isOpen={isOpenModal}
        closeModal={closeModal}
      >
        <div className="flex flex-col px-2">
          <div className="flex justify-center text-center gap-3 py-2 ">
            <span className="bg-elm-200 px-2 rounded-md">Mesa: {mesa.idMesa}</span>
            <span className="bg-shamrock-300 px-2 rounded-md">
              {formatPrecio(total)}
            </span>
          </div>

          <ul className="lista-confirmar">
            {/* una lista de los productos en la canasta Solo los que tengan Pendiente en su propiedad Estado: */}
            {canasta

              .map((item) => (
                <ItemCanasta key={item.codProducto} data={item} />
              ))}



              
{/* {canasta.map((producto, index) => (
              //<li key={index}>{producto.titulo} x{producto.cantidad}</li>
              <ItemCanasta key={index} data={producto} index={index} />
            ))} */}

          </ul>
        </div>

        <button onClick={() => clickEnviarPedido()} className="btn-confimar">
          confirmar Pedido
        </button>
      </Modal>
      <MenuNav />
      <HeaderMenu>
        <Buscador buscar={buscar} />
        <MenuCategorias filtrar={filtrarCategoria} />
      </HeaderMenu>
      <div className="flex flex-col items-center justify-start bg-white min-h-screen">
        <div className="productosContenedor flex flex-wrap gap-2 py-2 items-center justify-center">
          {productosMenu.map((producto) => (
            <Producto
              key={producto.codProducto}
              producto={producto}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

      <div className="w-full  bg-slate-50 nm-inset-white-sm items-center px-4 py-2 flex fixed bottom-0">
        <nav className="w-full ">
          <ul className="menuIconos ">
            <li
              onClick={() => openModal()}
              className="bg-shamrock-500 hover:bg-shamrock-600 transition-all text-white btnIcon"
            >
              <span className=" bg-scooter-700 text-xs w-4 h-4 rounded-full flex text-center justify-center items-center   ">
                {canasta.reduce((acc, item) => acc + item.Cantidad, 0)}
              </span>
              <Icarro fill={"#fff"} />
              <span className="">Canasta</span>
            </li>
            <Link className="Link" to={"/Mesas"}>
              <li
                className="shadow-lg btnIcon hoverNavMenu "
                onClick={() => openModal()}
              >
                <span className="font-medium">
                  Mesa:{" "}
                  <span className="font-semibold text-shamrock-600">
                    {" "}
                    #{mesa.idMesa}
                  </span>{" "}
                </span>
              </li>
            </Link>
            <Link className="Link" to={"/Cuenta"}>
              <li className="btnIcon shadow-lg hoverNavMenu">
                <Icuenta fill={"#000"} className={"w-5 h-5"} />
                Cuenta
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <ToastContainer />
    </>
  );
}
export default Menu;

//pruebas
