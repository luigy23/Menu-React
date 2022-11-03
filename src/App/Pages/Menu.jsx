import React from "react";
import "../Estilos/Menu.scss";
import Producto from "../Componentes/Producto";
import Canasta from "../Componentes/Canasta";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, buscarProductos, calcularTotal, delToCart } from "../Actions/canastaActions";
import { Link } from "react-router-dom";
import Buscador from "../Componentes/Buscador";

function Menu() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { productos, canasta, total, mesa, filtro } = state.canasta;
  const [textoBusqueda, setTextoBusqueda] = useState("")
  //METODOS
  const enviarPedido = () => {



    let O_pedido = {};
    const pedido = canasta.map(
      (item) =>
        //("-" + item.titulo.replace(" ", "%20")) + `%20(${item.cantidad})`)
        `Titulo: ${item.titulo} Cantidad ${item.cantidad} precio: ${
          item.precio * item.cantidad
        }`
    );
    //let pedidoWhatsapp = pedido.join("%0A")
    //console.log(pedido)
    //window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);

    O_pedido = { Mesa: mesa, Productos: canasta };
    console.log("pedido=", O_pedido);

    dispatch(calcularTotal());
  };
  const buscar = () =>{
    dispatch(buscarProductos(textoBusqueda))
    
  }

  //INTERFAZ
  return (
    <div className="page-menu">
      {//<NavMenu productos={productos} addToCart={() => dispatch(addToCart())} />
      }
      <Buscador evento={()=>buscar()} setTexto={(texto)=>setTextoBusqueda(texto)}></Buscador>
      <div className="contenedor-productos">
        {textoBusqueda.length=="" ?
          productos.map((producto) => (
            <Producto key={producto.id} data={producto} />))
        
        : filtro.map((producto) => (
          <Producto key={producto.id} data={producto} /> ))
        }




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
  );
}
export default Menu;

//pruebas
