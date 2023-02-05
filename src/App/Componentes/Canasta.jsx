import React from "react";
import "../Estilos/Canasta.scss"

import { useSelector} from "react-redux";
import ItemCanasta from "./ItemCanasta";


const Canasta = () => {
  

  const state = useSelector((state) => state)
  const { canasta } = state.canasta;

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
       
          <ItemCanasta  key={index}  data={producto} index={producto.Nombre}/>
  
          
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

