import React from "react";
import "../Estilos/Canasta.css"

import ItemCanasta from "./ItemCanasta";


const Canasta = ({canasta, delToCart,enviarPedido, addToCart}) => {
  

 




const visible = false;


  return (
    
 
    <>
    <div className="contenedor-canasta">
      <h2 className="titulo-pedido">Tu pedido:</h2>
      <div className="contenedor-lista">
        <ul className="lista-productos">
        {
          canasta.map((producto, index)=>
       
          <ItemCanasta delToCart={delToCart} key={index} addToCart={addToCart} data={producto} index={index}/>
  
          
          )

        }
        </ul>
      </div>
    </div>
    <button onClick={()=> enviarPedido()} className="btn-pedir">Finalizar Pedido</button>


    </>
      

  );
}

export default Canasta;

