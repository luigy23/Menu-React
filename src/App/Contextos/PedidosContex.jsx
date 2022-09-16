import { createContext, useState } from "react";

// creamos el context 
export const PedidosContex=createContext();

//creamos el provider (aquí va lo que queremos pasar estados, metodos)
const PedidosProvider=(props)=>{
const [pedido,setPedido] = useState([[]]);  //estado que pasaremos




//metodos y más
const añadirProducto = (producto)=>{



    setPedido(pedido.concat(producto));
    console.log("pedido: ");
    console.log(pedido);
  }

const quitarProducto = (pedidoNuevo) =>{

    setPedido(pedidoNuevo)
    

}





return(
<PedidosContex.Provider value= {{pedido:pedido, añadir:añadirProducto,quitar:quitarProducto}}>

{props.children}

</PedidosContex.Provider>

)

}
export default PedidosProvider;