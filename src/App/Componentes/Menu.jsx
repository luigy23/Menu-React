import React from "react";
import "../Estilos/Menu.css"
import Producto from "./Producto";
import Canasta from "./Canasta";
import NavMenu from "./NavMenu";
import { useReducer, useEffect } from "react";
import { canastaReducer, canastaInicialState } from "../Reducers/canastaReducer.jsx"
import { TYPES } from "../Actions/canastaAction";
import { useState } from "react";


function Menu() {
  
  const [productList, setProductList] = useState([]) //Aquí guardamos los productros que llamamos de la api
  const [cargado, setCargado] = useState(false)  //Estado de cuando los productos están cargados
  useEffect(() => {
    fetch("http://localhost:4000/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); //Llamada a metodo para actualizar los productos
        console.log(productList)
        setCargado(true)
      })



    cargadeProductos();



  }, [cargado]);

 
  const [state, dispatch] = useReducer(canastaReducer, canastaInicialState) //Traemos el estado incial y los metodos del Reducer
  const { productos, canasta, total } = state;


  //METODOS
  const cargadeProductos = () => {

    dispatch({ type: TYPES.CARGAR_PRODUCTOS, payload: productList }) //Guardamos los productos en el estado del Reducer
  }
  const addToCart = (id, cantidad, opcion) => {
    if (opcion == 1) { cantidad = 1 
      

    }
    

    let datos = [id, cantidad]
    dispatch({ type: TYPES.AÑADIR_A_CANASTA, payload: datos })
    console.log("agregado a add", canasta)
   calcularTotal()



  }
  const delToCart = (id, cantidad, opcion) => {
    if (opcion == 1) { ///Clic en Borrar todos
      dispatch({ type: TYPES.BORRAR_TODOS_CANASTA, payload: id })
      

    } else { /// Clic en -1

      cantidad > 1 ? dispatch({ type: TYPES.BORRAR_UNO_CANASTA, payload: id })
        : dispatch({ type: TYPES.BORRAR_TODOS_CANASTA, payload: id });


    }
    
    calcularTotal()

    

  }

  const enviarPedido = () => {
  
    let O_pedido = {}
    let productos = []
    
    const pedido = canasta.map((item) => 
      //("-" + item.titulo.replace(" ", "%20")) + `%20(${item.cantidad})`)
      (`Titulo: ${item.titulo} Cantidad ${item.cantidad} precio: ${(item.precio*item.cantidad)}`)    )

    //let pedidoWhatsapp = pedido.join("%0A")
    //console.log(pedido)
    //window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);
    O_pedido={Mesa:"5", Productos:pedido}
    console.log("pedido=",O_pedido)

    calcularTotal()



  }

  const calcularTotal=()=>{
  dispatch({ type: TYPES.CALCULAR_TOTAL })
    
  }

//INTERFAZ
  return (
    <>


      
        <NavMenu productos={productos} addToCart={addToCart}>
        </NavMenu>
      
       
        <div className="contenedor-productos">

          {
          
          productos.map((producto) =>
            <Producto key={producto.id} data={producto} add_to_cart={addToCart} />
          )}

        </div>

        <Canasta canasta={canasta} delToCart={delToCart} addToCart={addToCart} enviarPedido={enviarPedido}  />
        <h3>total = {total}</h3>
      

    </>


  );

}
export default Menu;