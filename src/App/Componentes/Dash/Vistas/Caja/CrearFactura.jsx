import React, { useEffect, useState, useRef } from "react";

import { traerProductosMesa } from "../../../../Services/ApiMesas";
import Factura from "../../../Funcionales/Factura";
import TablaFactura from "./TablaFactura";
import "../../../../Estilos/Caja.css";
import Pago from "./CrearFactura/Pago";


const CrearFactura = () => {
  const [pedido, setPedido] = useState([]);
  const [step, setStep] = useState(0);
  const [mesa, setMesaId] = useState("mesa22");

  const cargarPedido = async (mesa) => {
    if (!mesa) {
      setPedido([]);
      return;
    }
    const response = await traerProductosMesa(mesa);
    setPedido(response);
  };


  const steps = [
    //array de pasos de la factura
  <SeleccionarMesa cargarPedido={cargarPedido} setStep={setStep} setMesaId={setMesaId} />,
    <Cuenta
      pedido={pedido}
      setPedido={setPedido}
      mesa={mesa}
      setStep={setStep}
    />,
    <Pago setStep={setStep} pedido={pedido} mesa={mesa} />
    

    ,
  
  ];

  return (
    <div className="flex flex-col min-h-[400px] gap-4">
      <h1 className="text-2xl font-semibold">Nueva Factura</h1>
      <div className="items-center justify-center absolute left-3 top-3 p-2">
        {/* barra de progreso para los pasos: */}
        <ul className="stepsul">
          <li className={step === 0 ? "active" : ""} onClick={() => setStep(0)}>
            1
          </li>
          <li className={step === 1 ? "active" : ""} onClick={() => setStep(1)}>
            2
          </li>
          <li className={step === 2 ? "active" : ""} onClick={() => setStep(2)}>
            3
          </li>
        </ul>
      </div>
      <div className="flex flex-col ">{steps[step]}</div>
    </div>
  );
};

const Cuenta = ({ setStep, mesa, pedido }) => {
  return (
    <div className="flex flex-col gap-4 p-2">
      <p>Mesa: {mesa}</p>
      <TablaFactura pedido={pedido} />

      <div className="flex justify-between">
        <button onClick={() => setStep(0)} className="btn-back">
          Volver
        </button>
        <button onClick={() => setStep(2)} className="btn-next w-1/4">
          Continuar
        </button>
      </div>
    </div>
  );
};



const SeleccionarMesa = ({cargarPedido, setStep, setMesaId}) =>{

  const handleSubmit = (e) => {
    e.preventDefault();
    const mesa = e.target[0].value;
    cargarPedido(mesa);
    setMesaId(mesa);
    setStep(1);
  };
  return (

  <form
  onSubmit={(e) => handleSubmit(e)}
  className="flex flex-col gap-2 h-full justify-center items-center  "
>
  <label>Numero de Mesa: </label>
  <input type="number" className="border-2 p-1 text-center  rounded-md" />
  <button className="btn-next">Ver Cuenta</button>
</form>
  )
}



export default CrearFactura;

