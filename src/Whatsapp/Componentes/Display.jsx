import React from "react";
import "../Estilos/Display.css"
import Producto from "./Producto";
import Canasta from "./Canasta";
import NavMenu from "./NavMenu";
import PedidosProvider from "../Contextos/PedidosContex";
import { useReducer, useEffect } from "react";
import { canastaReducer, canastaInicialState } from "../Reducers/canastaReducer.jsx"
import { TYPES } from "../Actions/canastaAction";
import { useState } from "react";
import axios from "axios";


function Display() {

  
  const [productList, setProductList] = useState([]) //Aquí guardamos los productros que llamamos de la pai
  const [cargado, setCargado] = useState(false)  //Estado de cuando los productos están cargados
  const [buscar,setBuscar] = useState([])


  useEffect(() => {
    fetch("https://api-menu-a.herokuapp.com/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); //Llamada a metodo para actualizar los productos
        console.log(productList)
        setCargado(true)
      })



    /*
        cargarProductos();*/

    cargadeProductos();



  }, [cargado]);


  const [state, dispatch] = useReducer(canastaReducer, canastaInicialState) //Traemos el estado incial y los metodos del Reducer
  const { productos, canasta } = state;


  //METODOS
  const cargadeProductos = () => {

    dispatch({ type: TYPES.CARGAR_PRODUCTOS, payload: productList }) //Guardamos los productos en el estado del Reducer
  }
  const addToCart = (id, cantidad, opcion) => {
    if (opcion == 1) { cantidad = 1 }
    let datos = [id, cantidad]
    dispatch({ type: TYPES.AÑADIR_A_CANASTA, payload: datos })



  }
  const delToCart = (id, cantidad, opcion) => {
    if (opcion == 1) { ///Clic en Borrar todos
      dispatch({ type: TYPES.BORRAR_TODOS_CANASTA, payload: id })
    } else { /// Clic en -1

      cantidad > 1 ? dispatch({ type: TYPES.BORRAR_UNO_CANASTA, payload: id })
        : dispatch({ type: TYPES.BORRAR_TODOS_CANASTA, payload: id });


    }


  }
  const delOne = (id, cantidad) => {



  }
  const enviarPedido = () => {



    const pedido = canasta.map((item) =>
      ("-" + item.titulo.replace(" ", "%20")) + `%20(${item.cantidad})`)
    let pedidoWhatsapp = pedido.join("%0A")
    console.log(pedido)
    window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);

  }
  /*
  const buscarProductos = (nombre) => {
    let resultadosBusqueda= productos.filter((item)=> item.nombre.includes(nombre))
    setBuscar("")
    console.log(buscar)
  }*/


//INTERFAZ
  return (
    <>


      <PedidosProvider>
        <NavMenu productos={productos} addToCart={addToCart}>
        </NavMenu>
      
        <h1 className="titulo">Bienvenido a Menu Virtual</h1>
        <div className="contenedor-productos">

          {
          
          productos.map((producto) =>
            <Producto key={producto.id} data={producto} add_to_cart={addToCart} />
          )}

        </div>

        <Canasta canasta={canasta} delToCart={delToCart} addToCart={addToCart} enviarPedido={enviarPedido} delOne={delOne} />

      </PedidosProvider>

    </>


  );

}
export default Display;