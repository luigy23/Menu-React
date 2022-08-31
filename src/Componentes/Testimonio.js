import React from "react";
import "../Styles/Testimonio.css"

function Testimonio(props) {


  return(
    <div className="contendenor-testimonio">
      <img className="img-testimonio" src={require(`../imagenes/${props.imagen}.jpg`)}
      alt="imagen de lucas"
      ></img>
      <div className="contenedor-txt-testimonio">
        <p className="nombre-testimonio">{props.nombre} de {props.pais}</p>
        <p className="cargo-testimonio">{props.cargo} en {props.empresa}</p>
        <p className="texto-testimonio">{props.testimonio} </p>


      </div>
    </div>

  );  
}
export default Testimonio;