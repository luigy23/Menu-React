import React, { useEffect, useState, useRef } from "react";

import { traerProductosMesa } from "../../../../Services/ApiMesas";
import Factura from "../../../Funcionales/Factura";
import TablaFactura from "./TablaFactura";
import "../../../../Estilos/Caja.css";
import { formatPrecio } from "../../../../Services/formatPrecio";
import { crearFactura } from "../../../../Services/ApiFacturas";
import { ToastContainer, toast } from "react-toastify";
import { obtenerMetodosPago } from "../../../../Services/ApiMetodosPago";
import { useReactToPrint } from "react-to-print";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const mesa = e.target[0].value;
    cargarPedido(mesa);
    setMesaId(mesa);
    setStep(1);
  };

  const steps = [
    //array de pasos de la factura
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-2 h-full justify-center items-center  "
    >
      <label>Numero de Mesa: </label>
      <input type="number" className="border-2 p-1 text-center  rounded-md" />
      <button className="btn-next">Ver Cuenta</button>
    </form>,
    <Cuenta
      pedido={pedido}
      setPedido={setPedido}
      mesa={mesa}
      setStep={setStep}
    />,
    <Pago setStep={setStep} pedido={pedido} mesa={mesa} />,
  
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

const Pago = ({ setStep, pedido, mesa }) => {
  const [pago, setPago] = useState("efectivo");
  const [metodosPago, setMetodosPago] = useState([]);
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [montoCambio, setMontoCambio] = useState(0);
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    const cargarMetodosPago = async () => {
      const resultado = await obtenerMetodosPago();
      setMetodosPago(resultado.metodos_pago);
    };
    cargarMetodosPago();
  }, []);

  //use ref
  const impresion = useRef();

  const imprimirFactura = useReactToPrint({
      content: () => impresion.current,
      copyStyles: true,
    });



  const enviarFactura = async () => {
    //verificar que el monto recibido sea mayor al total
    if (montoRecibido < calcularTotal()) {
      alert("El monto recibido debe ser mayor al total");
      return;
    }

    //sacar id de pago seleccionado:
    const metodoPago = metodosPago.find(
      (metodo) => metodo.Nombre === pago
    ).idMetodoPago;
    console.log(metodoPago);

    const factura = {
      mesa: mesa,
      idMetodoPago: metodoPago,
      idUsuario: "JPEREZ",
      recibido: montoRecibido,
      descuento: descuento,
    };

    const response = await toast.promise(crearFactura(factura), {
      pending: "Facturando...",
      success: "Factura creada 👌",
      error: {
        render({ data }) {
          console.log(data);
          return `Error: ${data.response.data.message}`;
        },
      },
    });

    console.log(response);
    if (response) {
      setStep(0);
    }
    imprimirFactura();
  };

  const seleccionarPago = (e) => {
    setPago(e.target.value);
    console.log(e.target.value);
    //extraer nombre del id del metodo de pago

    //si no es efectivo, resetear el monto recibido y el cambio
    if (e.target.value.Nombre !== "Efectivo") {
      setMontoCambio(0);
      setMontoRecibido(calcularTotal());
    }
  };

  const calcularTotal = () => {
    const total = pedido.reduce((acc, item) => {
      if (item.Estado === "Cancelado") {
        return acc;
      }
      return acc + item.Precio * item.Cantidad;
    }, 0);
    return total;
  };

  const calcularCambio = (montoRecibido) => {
    const total = calcularTotal();
    const cambio = montoRecibido - total;
    setMontoCambio(cambio);
  };

  const handleMontoRecibido = async (e) => {
    if (pago === "Efectivo") {
      calcularCambio(e.target.value);
    }
    setMontoRecibido(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        <form className="flex  gap-4">
          <label className="font-semibold">Seleccionar tipo de pago: </label>
          {
            //si hay metodos de pago, mostrarlos
            //si no hay metodos de pago, mostrar un mensaje
            metodosPago.length > 0 ? (
              metodosPago.map((metodo) => (
                <label
                  className={`label-metodo-pago ${
                    pago === metodo.Nombre ? "label-pago-selected" : ""
                  }`}
                  key={metodo.IdMetodoPago}
                >
                  {metodo.Nombre}
                  <input
                    type="radio"
                    name="pago"
                    value={metodo.Nombre}
                    onChange={seleccionarPago}
                  />
                </label>
              ))
            ) : (
              <p>No hay metodos de pago</p>
            )
          }
        </form>
        {
          //si el pago es efectivo, mostrar el input para el monto recibido y el cambio
          pago === "Efectivo" && (
            <div className="flex gap-3">
              <label>Monto recibido: </label>
              <input
                type="number"
                onChange={handleMontoRecibido}
                placeholder="$$"
              />
              <label>
                Cambio:{" "}
                <span className={montoCambio < 0 && "text-red-500"}>
                  {formatPrecio(montoCambio)}
                </span>
              </label>
            </div>
          )
        }
        <div className="flex gap-3">
          <label className="flex gap-3">
            Descuento:
            <input
              type="checkbox"
              onChange={(e) => setDescuento(e.target.checked)}
            />
          </label>
          {
            // si un checkbox esta seleccionado, mostrar el input para el descuento
            descuento > 0 && (
              <label className="flex gap-3">
                <input
                  type="number"
                  onChange={(e) => setDescuento(e.target.value)}
                  placeholder="$0"
                  value={descuento}
                />
              </label>
            )
          }
        </div>

        <div className="flex flex-col">
          <label className="label-total">
            SubTotal: {formatPrecio(calcularTotal() - descuento)}
          </label>
        </div>

        <div className="flex justify-between">
          <button onClick={() => setStep(1)} className=" btn-back">
            Volver
          </button>
          <button
            onClick={enviarFactura}
            className="bg-shamrock-500 hover:bg-shamrock-600 w-1/3 py-2 px-4 text-white"
          >
            Pagar
          </button>
          <button
          onClick={imprimirFactura}
          >
            imprimir
          </button>

        </div>
      </div>
      
      <ToastContainer />
      <div
          
          style={{
            display: "none",
          }}
        >
          <Factura 
          impresion={impresion}
          pedido={pedido}
          />

        </div>
    </>
  );
};



export default CrearFactura;

