import React from "react";
import "../Estilos/Menu.css"
import Producto from "../Componentes/Producto";
import Canasta from "../Componentes/Canasta";
import NavMenu from "../Componentes/NavMenu";
import  {useSelector, useDispatch} from "react-redux"
import { addToCart, calcularTotal, delToCart } from "../Actions/canastaActions";


function Menu() {
  
  
 /* useEffect(() => {
    fetch("http://localhost:4000/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); //Llamada a metodo para actualizar los productos
        console.log(productList)
        setCargado(true)
      })



    cargadeProductos();



  }, [cargado]);
*/
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const { productos, canasta, total } = state.canasta;


  //METODOS
 const enviarPedido = () => {
  console.log("Estadooo:")
  console.log(state)
    let O_pedido = {}
    //let productos = []

    const pedido = canasta.map((item) =>
        //("-" + item.titulo.replace(" ", "%20")) + `%20(${item.cantidad})`)
        (`Titulo: ${item.titulo} Cantidad ${item.cantidad} precio: ${(item.precio * item.cantidad)}`))

    //let pedidoWhatsapp = pedido.join("%0A")
    //console.log(pedido)
    //window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);
    O_pedido = { Mesa: "5", Productos: pedido }
    console.log("pedido=", O_pedido)

    dispatch(calcularTotal())



}

//INTERFAZ
  return (
    <>


      
        <NavMenu productos={productos} addToCart={()=>dispatch(addToCart())}>
        </NavMenu>
      
       
        <div className="contenedor-productos">

          {
          
          productos.map((producto) =>
            <Producto key={producto.id} data={producto} add_to_cart={()=>dispatch(addToCart())} />
          )}

        </div>

        <Canasta producto={productos} canasta={canasta} delToCart={()=>dispatch(delToCart())} addToCart={()=>dispatch(addToCart())} enviarPedido={enviarPedido}  />
        <h3>total = {total}</h3>
      

    </>


  );

}
export default Menu;


//pruebas



