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
const Menu = () => {
  const dispatch = useDispatch();
  const { productos, canasta, total, mesa } = useSelector((state) => state.canasta);
  const { user } = useSelector((state) => state.usuario);
  const [productosMenu, setProductosMenu] = useState(productos);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    setProductosMenu(productos);
  }, [productos]);

  const handleSearch = (texto) => {
    if (!texto) {
      setProductosMenu(productos);
      return;
    }
    
    const filtered = productos.filter(producto => 
      producto.Nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setProductosMenu(filtered);
  };

  const handleCategoryFilter = (idCategoria) => {
    if (idCategoria === "all") {
      setProductosMenu(productos);
      return;
    }
    
    const filtered = productos.filter(producto => 
      producto.idCategoria === idCategoria
    );
    setProductosMenu(filtered);
  };

  const validateOrder = () => {
    if (!user) {
      throw new Error("No se ha identificado al mesero");
    }
    if (!mesa?.idMesa) {
      throw new Error("No se ha seleccionado una mesa válida");
    }
    if (!canasta?.length) {
      throw new Error("La canasta está vacía");
    }
  };

  const createOrderPayload = (shouldPrint) => ({
    Mesero: user,
    Mesa: mesa.idMesa,
    MesaDescripcion: mesa.Descripcion,
    Productos: canasta.map(item => ({
      nombre: item.Nombre,
      id: item.codProducto,
      cantidad: item.Cantidad,
      precio: item.Precio,
      comentario: item.comentario,
      idCategoria: item.idCategoria,
    })),
    Total: total,
    Imprimir: shouldPrint ? 1 : 2
  });

  const handleOrderSubmission = async (shouldPrint = true) => {
    try {
      validateOrder();
      const orderPayload = createOrderPayload(shouldPrint);
      const isMesaOcupada = ["Ocupado", "Sin Pagar"].includes(mesa.Estado);
      
      const apiCall = isMesaOcupada
        ? () => añadirProductosPedido(mesa.idMesa, orderPayload.Productos, orderPayload.Imprimir)
        : () => nuevoPedido(orderPayload);

      await toast.promise(apiCall(), {
        pending: isMesaOcupada ? "Enviando productos adicionales..." : "Creando nuevo pedido...",
        success: isMesaOcupada ? "Productos añadidos al pedido existente 👌" : "Nuevo pedido creado exitosamente 👌",
        error: "Error al procesar el pedido"
      });

      if (!isMesaOcupada) {
        dispatch(seleccionarMesa({ ...mesa, Estado: "Ocupado" }));
      }

      dispatch(vaciarCanasta());
      dispatch(calcularTotal());
      closeModal();
    } catch (error) {
      toast.error(error.message || "Error desconocido al procesar el pedido");
    }
  };

  const CartModal = () => (
    <Modal
      estilo="max-w-lg bg-opacity-90"
      isOpen={isOpenModal}
      closeModal={closeModal}
    >
      <div className="flex flex-col px-2 text-sm">
        <div className="flex justify-center text-center gap-3 py-2">
          <span className="bg-elm-200 px-2 rounded-md">
            Mesa: {mesa.Descripcion}
          </span>
          <span className="bg-shamrock-300 px-2 rounded-md">
            {formatPrecio(total)}
          </span>
        </div>

        <ul className="min-h-[100px] max-h-[calc(100vh-200px)] bg-slate-500 flex-grow overflow-y-auto">
          {canasta.map((item) => (
            <ItemCanasta key={item.codProducto} data={item} />
          ))}
        </ul>

        <button 
          className="btn-confimar"
          onClick={() => handleOrderSubmission(true)}
          onContextMenu={(e) => {
            e.preventDefault();
            if (window.confirm("¿Desea enviar el pedido sin imprimir?")) {
              handleOrderSubmission(false);
            }
          }}
        >
          Confirmar Pedido
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <CartModal />
      <MenuNav />
      <HeaderMenu>
        <Buscador buscar={handleSearch} />
        <MenuCategorias filtrar={handleCategoryFilter} />
      </HeaderMenu>

      <main className="flex flex-col items-center justify-start bg-white min-h-screen">
        <div className="productosContenedor flex flex-wrap gap-2 py-2 items-center justify-center pb-24">
          {productosMenu.map((producto) => (
            <Producto
              key={producto.codProducto}
              producto={producto}
              openModal={openModal}
            />
          ))}
        </div>
      </main>

      <footer className="w-full bg-slate-50 nm-inset-white-sm items-center px-4 py-2 flex fixed bottom-0">
        <nav className="w-full">
          <ul className="menuIconos">
            <li
              onClick={openModal}
              className="bg-shamrock-500 hover:bg-shamrock-600 transition-all text-white btnIcon"
            >
              <span className="bg-scooter-700 text-xs w-4 h-4 rounded-full flex text-center justify-center items-center">
                {canasta.reduce((acc, item) => acc + item.Cantidad, 0)}
              </span>
              <Icarro fill="#fff" />
              <span>Canasta</span>
            </li>
            
            <Link to="/" className="Link">
              <li className="shadow-lg btnIcon hoverNavMenu">
                <span className="font-medium">
                  <span className="font-semibold text-shamrock-600">
                    #{mesa.Descripcion}
                  </span>
                </span>
              </li>
            </Link>
            
            <Link to="/Cuenta" className="Link">
              <li className="shadow-lg btnIcon hoverNavMenu">
                <Icuenta fill="#000" className="w-5 h-5" />
                Cuenta
              </li>
            </Link>
          </ul>
        </nav>
      </footer>
      
      <ToastContainer />
    </>
  );
};

export default Menu;