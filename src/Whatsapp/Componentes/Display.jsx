import React from "react";
import "../Estilos/Display.css"
import Producto from "./Producto";
import Canasta from "./Canasta";
import PedidosProvider from "../Contextos/PedidosContex";
import { useReducer,useEffect } from "react";
import {canastaReducer, canastaInicialState} from "../Reducers/canastaReducer.jsx" 
import { TYPES } from "../Actions/canastaAction";
import { useState } from "react";
import axios from "axios";


function Display() {
  const [productList,setProductList] = useState([]) //llamados a la api para traer los productos.
  const [cargado,setCargado]= useState(false)
  useEffect(()=>{
    fetch("https://api-menu-a.herokuapp.com/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
        console.log(productList)
        setCargado(true)
      })
        


/*
    cargarProductos();*/
    
    cargadeProductos();
    
    

  },[cargado]);
  

  const [state, dispatch] = useReducer(canastaReducer, canastaInicialState)
  const {productos, canasta} = state;
  
  const addToCart = (id,cantidad) =>{
    let datos=  [id,cantidad]
    dispatch({type:TYPES.AÑADIR_A_CANASTA, payload:datos})
    
    

  }

  const delToCart = (id)=>{
    dispatch({type:TYPES.BORRAR_TODOS_CANASTA, payload:id})

  }

 /* const delCart = ()=>{
    dispatch({type:TYPES.BORRAR_TODOS_CANASTA})

  }*/
  const cargadeProductos = ()=>{
    
    dispatch({type:TYPES.CARGAR_PRODUCTOS,payload:productList})
  }



  const enviarPedido = ()=>{
    
    

   const pedido = canasta.map((item)=> 
   ("-"+item.titulo.replace(" ","%20"))+`%20(${item.cantidad})`)
    let pedidoWhatsapp= pedido.join("%0A")
    console.log(pedido)
    window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);
    
  }

  

  return (

   
    <>
  
    
      <PedidosProvider>
        <h1 className="titulo">Bienvenido a Menu Virtual</h1>
        <div className="contenedor-productos">

          {productos.map((producto) => 
          <Producto key = {producto.id} data={producto} add_to_cart= {addToCart} />
          )}
           
        </div>

        <Canasta canasta={canasta} delToCart = {delToCart} enviarPedido={enviarPedido}/>
        
      </PedidosProvider>

    </>


  );

          }
export default Display;