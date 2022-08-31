
import React from 'react';
import Contador from './Contador';
import '../Styles/DisplayContador.css'
import Testimonio from "./Testimonio.js";
import Boton from './Boton';
import {useState} from 'react';

function DisplayContador() {

  const [numClics, setnumClics] = useState(0);

  const manejarclic = () => {
    setnumClics(numClics + 1);


  };
  const reiniciarcontador = () => {

    setnumClics(0);
  };

  return (
    <>

<div className='contenedor-logo'>
        <h1>Contador</h1>
      </div>
      <div className='contenedor-contador'>
        <Contador numClics={numClics} />
        <div className='contenedor-botones'>
        <Boton texto="Dame clic"
          tipo="btn-principal"
          manejarclic={manejarclic} />

        <Boton texto="Reiniciar"
          tipo="btn-reiniciar"
          manejarclic={reiniciarcontador} /> 
          </div>          
      </div>
      <div className='contenedor-principal'>
        <h1 className='titulo-principal'>Testimonios React</h1>
      </div>
      <div className='contenedor-testimonio'>
        <Testimonio
          nombre="Lucas"
          pais="Dinamarca"
          cargo="Ingeniero"
          empresa="Rappi"
          testimonio="Kaizen, engloba el concepto de un método de gestión de la calidad muy conocido en el mundo de la industria. Es un proceso de mejora continua basado"
          imagen="lucas"
        />
        <Testimonio
          nombre="Jhon Blake"
          pais="España"
          cargo="Senior Developer"
          empresa="Google"
          testimonio="Kaizen, engloba el concepto de un método de gestión de la calidad muy conocido en el mundo de la industria. Es un proceso de mejora continua basado"
          imagen="jhon"
  /></div>

    </>
  );
}

export default DisplayContador;