import React from "react";
import { useModal } from "../Hooks/useModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

import {
  calcularTotal,
  seleccionarMesa,
  vaciarCanasta,
} from "../Actions/canastaActions"; // Acciones de canasta
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
  const { user } = state.usuario;
  const [productosMenu, setProductosMenu] = useState([]); //productos del menu
  const [filtroActivo, setFiltroActivo] = useState(false); //texto de busqueda

  //
  //utilidades :
  const [isOpenModal, openModal, closeModal] = useModal(false);
// METODOS
const enviarPedidoAPI = async (pedido) => {
  if (!pedido || !Array.isArray(pedido.Productos) || pedido.Productos.length === 0) {
    toast.error("No hay productos válidos en el pedido");
    return;
  }

  if (!mesa || !mesa.idMesa) {
    toast.error("No se ha seleccionado una mesa válida");
    return;
  }

  const esMesaOcupada = mesa.Estado === "Ocupado" || mesa.Estado === "Sin Pagar";

  try {
    let response;
    if (esMesaOcupada) {
      response = await toast.promise(
        añadirProductosPedido(mesa.idMesa, pedido.Productos, pedido.Imprimir),
        {
          pending: "Enviando productos adicionales...",
          success: "Productos añadidos al pedido existente 👌",
          error: "Error al añadir productos al pedido",
        }
      );
    } else {
      response = await toast.promise(
        nuevoPedido(pedido),
        {
          pending: "Creando nuevo pedido...",
          success: "Nuevo pedido creado exitosamente 👌",
          error: "Error al crear nuevo pedido",
        }
      );

      dispatch(seleccionarMesa({ idMesa: mesa.idMesa, Estado: "Ocupado", Descripcion: mesa.Descripcion }));
      // Actualizar el estado de la mesa a ocupado
      
    }

    console.log("Respuesta del servidor:", response);
    dispatch(vaciarCanasta());
    dispatch(calcularTotal());
  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    toast.error(error.response?.data || "Error desconocido al procesar el pedido");
  }
};

const clickEnviarPedido = (imprimir) => {
  if (!user) {
    toast.error("No se ha identificado al mesero");
    return;
  }

  if (!mesa || !mesa.idMesa) {
    toast.error("No se ha seleccionado una mesa válida");
    return;
  }

  if (!Array.isArray(canasta) || canasta.length === 0) {
    toast.error("La canasta está vacía");
    return;
  }

  const productosPedido = canasta.map((item) => ({
    nombre: item.Nombre,
    id: item.codProducto,
    cantidad: item.Cantidad,
    precio: item.Precio,
    comentario: item.comentario,
    idCategoria: item.idCategoria,
  }));

  const pedido = {
    Mesero: user,
    Mesa: mesa.idMesa,
    MesaDescripcion: mesa.Descripcion,
    Productos: productosPedido,
    Total: total,
    Imprimir: imprimir || 1,
   
  };

  enviarPedidoAPI(pedido);
  closeModal();
  dispatch(calcularTotal());
};
  const resetEstado = () => {
    dispatch(vaciarCanasta());
    dispatch(calcularTotal());
    dispatch(seleccionarMesa({ idMesa: "", Estado: "" }));
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
            <span className="bg-elm-200 px-2 rounded-md">
              Mesa: {mesa.Descripcion}
            </span>
            <span className="bg-shamrock-300 px-2 rounded-md">
              {formatPrecio(total)}
            </span>
          </div>

          <ul className="lista-confirmar">
            {/* una lista de los productos en la canasta Solo los que tengan Pendiente en su propiedad Estado: */}
            {canasta.map((item) => (
              <ItemCanasta key={item.codProducto} data={item} />
            ))}
          </ul>
        </div>

        <button onContextMenu={
          (e) => {
            e.preventDefault();
            //confirmacion de envio de pedido
            const confirmar = window.confirm("¿Desea enviar el pedido sin imprimir?");
            if (confirmar) {

            clickEnviarPedido(2);
            }

          }
        }  onClick={() => clickEnviarPedido()} className="btn-confimar">
          confirmar Pedido
        </button>
      </Modal>
      <MenuNav />
      <HeaderMenu>
        <Buscador buscar={buscar} />
        <MenuCategorias filtrar={filtrarCategoria} />
      </HeaderMenu>
      <div className="flex flex-col items-center justify-start bg-white min-h-screen ">
        <div className="productosContenedor flex flex-wrap gap-2 py-2 items-center justify-center pb-24">
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
            <Link className="Link" to={"/"}>
              <li
                className="shadow-lg btnIcon hoverNavMenu "
                onClick={() => openModal()}
              >
                <span className="font-medium">
                  
                  <span className="font-semibold text-shamrock-600">
                    {" "}
                    #{mesa.Descripcion}
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
