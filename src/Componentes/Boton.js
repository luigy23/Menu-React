import React from "react";
import "../Styles/Boton.css"

function Boton({texto, tipo, manejarclic}) {
    return(
        <button 
        className={tipo}
        onClick={manejarclic}
        >{texto}</button>


    );
}

export default Boton;