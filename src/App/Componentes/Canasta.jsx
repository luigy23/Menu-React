import React from "react";
import "../Estilos/Canasta.scss"

import ItemCanasta from "./ItemCanasta";


const Canasta = ({canasta, enviarPedido}) => {
  

 


const visible = false;


  return (
    
 
    <>
    <div className="overlay-canasta">
    <div className="contenedor-canasta">
      <h2 className="titulo-pedido">Tu pedido:</h2>
      <div className="contenedor-lista">
        <ul className="lista-productos">
        {
          canasta.map((producto, index)=>
       
          <ItemCanasta  key={index}  data={producto} index={index}/>
  
          
          )

        }
        </ul>
      </div>
    </div>
    </div>


    </>
      

  );
}

export default Canasta;

