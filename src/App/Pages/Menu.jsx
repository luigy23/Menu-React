import React from "react";
import "../Estilos/Menu.scss";
import Producto from "../Componentes/Producto";
import Canasta from "../Componentes/Canasta";
import MenuNav from "../Componentes/MenuNav";
import Modal from "../Componentes/Modal"
import ItemCanasta from "../Componentes/ItemCanasta";
import { useModal } from "../Hooks/useModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { buscarProductos, calcularTotal } from "../Actions/canastaActions";
import { Link } from "react-router-dom";
import Buscador from "../Componentes/Buscador";

function Menu() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpenModal,openModal,closeModal] = useModal(false);
  const { productos, canasta, total, mesa, filtro } = state.canasta;
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //METODOS
  const enviarPedido = () => {
    let pedido = {};
    let mesero = "Luis";

    const productosPedido = canasta.map((item) => {
      return { id: item.id, cantidad: item.cantidad, precio: item.precio};
    });

    pedido = { Mesero: mesero, Mesa: mesa, Productos: productosPedido };
    console.log("pedido=", pedido);
    openModal()
    dispatch(calcularTotal());
  };

  const buscar = () => {
    dispatch(buscarProductos(textoBusqueda));
  };

  //INTERFAZ
  return (
    <>
      <MenuNav />
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
      <p className="texto-confirmar">Este es tu pedido:</p>
      <ul className="lista-confirmar">
        {
          canasta.map((producto, index)=>
       
          //<li key={index}>{producto.titulo} x{producto.cantidad}</li>
          <ItemCanasta  key={index}  data={producto} index={index}/>
  
          
          )

        }
        </ul>
        <p className="texto-confirmar">{mesa}</p>
        <button  className="btn-confimar">
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

        <Canasta
          producto={productos}
          canasta={canasta}
          enviarPedido={enviarPedido}
        />
        <div className="contenedor-detalles">
          <h3>Total = ${total}</h3>
          <Link className="Link" to={"/Mesas"}>
            <div>
              <h3>{mesa}</h3>
            </div>
          </Link>
          <button onClick={() => enviarPedido()} className="btn-pedir">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
export default Menu;

//pruebas
