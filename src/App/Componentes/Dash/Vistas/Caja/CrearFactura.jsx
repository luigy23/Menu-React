import React, { useEffect, useState, useRef } from "react";

import { traerMesas, traerProductosMesa } from "../../../../Services/ApiMesas";
import Factura from "../../../Funcionales/Factura";
import TablaFactura from "./TablaFactura";
import "../../../../Estilos/Caja.css";
import Pago from "./CrearFactura/Pago";


/*
En este archivo hay 3 componentes funcionales:
- CrearFactura
- Cuenta
- SeleccionarMesa

CrearFactura es el componente principal, que se encarga de manejar los estados de los otros dos componentes.
Cuenta es el componente que muestra la cuenta de la mesa seleccionada.
SeleccionarMesa es el componente que permite seleccionar la mesa para la que se quiere crear la factura.

setStep es una función que cambia el estado de step, que es un número que indica en qué paso de la factura estamos.

*/


const CrearFactura = () => {
  const [pedido, setPedido] = useState([]);
  const [step, setStep] = useState(0);
  const [mesa, setMesaId] = useState("mesa22"); 
  const [mesaDescripcion, setMesaDescripcion] = useState("Mesa 22");


  const cargarPedido = async (mesa) => { //se usa en el componente SeleccionarMesa
    if (!mesa) {
      setPedido([]);
      return;
    }
    const response = await traerProductosMesa(mesa);
    
    setPedido(response);
  };

  const steps = [ // array de componentes que se renderizan en función del paso en el que estemos
    <SeleccionarMesa
      cargarPedido={cargarPedido}
      setStep={setStep}
      setMesaId={setMesaId}
      setMesaDescripcion={setMesaDescripcion}
    />,
    <Cuenta
      pedido={pedido}
      setPedido={setPedido}
      mesa={mesa}
      mesaDescripcion={mesaDescripcion}
      setStep={setStep}
    />,
    <Pago setStep={setStep} pedido={pedido} mesa={mesa} mesaDescripcion={mesaDescripcion} />,
  ];

  return (
    <div className="flex flex-col min-h-[400px] gap-4">
      <h1 className=" text-xl md:text-2xl font-semibold">Nueva Factura</h1>
      <div className="items-center justify-center  p-2">
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

const SeleccionarMesa = ({ cargarPedido, setStep, setMesaId, setMesaDescripcion }) => {
  const [mesas, setMesas] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchMesas = async () => {
      const todasLasMesas = await traerMesas(); // Asume esta función existe
      const mesasFiltradas = todasLasMesas.filter(mesa => mesa.Estado === 'Sin Pagar');
      setMesas(mesasFiltradas);
    };
    fetchMesas();
  }, []);

  const mesasVisibles = mesas.filter(mesa => mesa.Descripcion.toLowerCase().includes(filtro.toLowerCase()));

  const handleMesaClick = (mesa) => {
    cargarPedido(mesa.idMesa);
    setMesaId(mesa.idMesa);
    setMesaDescripcion(mesa.Descripcion);
    setStep(1);
  };

  return (
    <div className="flex flex-col bg-red-100 w-full gap-4">
      <input
        type="text"
        placeholder="Buscar mesa por descripción..."
        className="border-2 p-2 rounded-md"
        onChange={e => setFiltro(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mesasVisibles.map(mesa => (
          <div
            key={mesa.idMesa}
            className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleMesaClick(mesa)}
          >
            <p className="text-lg font-semibold">{mesa.Descripcion}</p>
            <p>{`ID: ${mesa.idMesa}`}</p>
            <p>{`Estado: ${mesa.Estado}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Cuenta = ({ setStep, mesa, pedido, mesaDescripcion }) => {
  return (
    <div className="flex flex-col w-full">
    <div className="flex flex-col  p-2 items-center justify-center">
      <p>Mesa: {mesaDescripcion}</p>
      <div className="relative w-full max-h-64 overflow-auto">
      <TablaFactura pedido={pedido} />
      </div>
      <div className="flex justify-between mt-2">
        <button onClick={() => setStep(0)} className="btn-back ">
          Volver
        </button>
        <button onClick={() => setStep(2)} className="btn-next ml-2">
          Continuar
        </button>
      </div>
    </div>
  </div>
  );
};

//El componete de Pago está en el archivo Pago.jsx


export default CrearFactura;
