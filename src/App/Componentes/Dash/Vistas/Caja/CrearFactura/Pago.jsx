import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import { crearFactura } from "../../../../../Services/ApiFacturas";
import { obtenerMetodosPago } from "../../../../../Services/ApiMetodosPago";
import { formatPrecio } from "../../../../../Services/formatPrecio";
import Factura from "../../../../Funcionales/Factura";
import { ca } from "date-fns/locale";
import { useSelector } from "react-redux";
import { parse, set, sub } from "date-fns";

const Pago = ({ setStep, pedido, mesa, mesaDescripcion }) => {
  const { user } = useSelector((state) => state.usuario);

  const [pago, setPago] = useState("efectivo");
  const [metodosPago, setMetodosPago] = useState([]);
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [montoCambio, setMontoCambio] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [descuentoActivo, setDescuentoActivo] = useState(false);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [propina, setPropina] = useState(0);
  const [propinaActiva, setPropinaActiva] = useState(false);

  useEffect(() => {
    const cargarMetodosPago = async () => {
      const resultado = await obtenerMetodosPago();
      setMetodosPago(resultado.metodos_pago);
    };
    cargarMetodosPago();

    setSubtotal(calcularTotal());
  }, []);

  useEffect(() => {
    calcularSubtotal();
    calcularCambio();
    
  }, [descuentoActivo, descuento, propina, propinaActiva]); //descuento, propinaActiva,propina, total

  const calcularSubtotal = () => {
    let sub_total = total;



    if (descuentoActivo) {

      sub_total -= parseInt(descuento) ? parseInt(descuento) : 0;
    }else{
      setDescuento(0);
    }


    if (propinaActiva) {
      sub_total += parseInt(propina) ? parseInt(propina) : 0;
    }
    setSubtotal(sub_total);
    return sub_total;
  };

  const calcularPropina = () => {
    setPropina(calcularTotal() * 0.1);
  };

  const seleccionarPago = (e) => {
    setPago(e.target.value);
    console.log(e.target.value);
    //extraer nombre del id del metodo de pago

    //si no es efectivo, resetear el monto recibido y el cambio
    if (e.target.value.Nombre !== "Efectivo") {
      setMontoCambio(0);
      setMontoRecibido(total);
    }
  };

  const handleMontoRecibido = async (e) => {
    if (pago === "Efectivo") {
      calcularCambio(e.target.value);
    }
    setMontoRecibido(e.target.value);
  };

  const calcularTotal = () => {
    let totalCalculado = 0;

    pedido.forEach((item) => {
      if (item.Estado !== "Cancelado" && item.Estado !== "Pendiente") {
        totalCalculado += item.Precio * item.Cantidad;
      }
    });

    if (totalCalculado !== total) {
      setTotal(totalCalculado);
    }
    setSubtotal(totalCalculado);
    return totalCalculado;
  };

  const calcularCambio = (recibido = montoRecibido) => {
    const sub_total = calcularSubtotal();
    const cambio = recibido - sub_total;
    setMontoCambio(cambio);
  };

  const handleDescuentoActivo = (e) => {
    setDescuentoActivo(e.target.checked);
    if (!e.target.checked) {
      setDescuento(0);
    }
  };
  const handleDescuento = (e) => {
   const descuento = parseInt(e.target.value);
   setDescuento(descuento);
   

  };

  const handlePropinaActiva = (e) => {
    setPropinaActiva(e.target.checked);
    calcularPropina();
    if (!e.target.checked) {
      setPropina(0);
    }
  };
  const handlePropina = (e) => { 
    const propina = parseInt(e.target.value);
    setPropina(propina);
  };


  

  const enviarFactura = async () => {
    //verificar que el monto recibido sea mayor al total
    if (montoRecibido < subtotal) {
      alert("El monto recibido debe ser mayor al total");
      return;
    }

    //sacar id de pago seleccionado:
    const metodoPago = metodosPago.find(
      (metodo) => metodo.Nombre === pago
    ).idMetodoPago;

    const factura = {
      mesa: mesa,
      idMetodoPago: metodoPago,
      idUsuario: user,
      recibido: montoRecibido,
      descuento: descuento,
      propina: propina,
      subtotal: subtotal,
      total: total,
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

  //use ref
  const impresion = useRef();

  const imprimirFactura = useReactToPrint({
    content: () => impresion.current,
    copyStyles: true,
  });

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
                name="montoRecibido"
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
        <div className="flex gap-3 bg-scooter-200  p-2">
          <label className="flex gap-3">
            Descuento:
            <input type="checkbox" 
            checked={descuentoActivo}
            onChange={handleDescuentoActivo} />
          </label>
          {
            // si un checkbox esta seleccionado, mostrar el input para el descuento
            descuentoActivo && (
              <label className="flex gap-3">
                <input
                  type="number"
                  onChange={handleDescuento}
                  placeholder="$0"
                  value={descuento}
                />
              </label>
            )
          }
        </div>
        <div className="flex gap-3 bg-shamrock-100 p-2 items-center">
          <label className="flex gap-3 ">
            Propina (10%){" "}
            <input
              type="checkbox"
              checked={propinaActiva}
              onChange={handlePropinaActiva}
            />
          </label>
          {propinaActiva && (
            <label className="flex gap-3 ">
              <input
                type="number"
                className="bg-transparent px-2 rounded-md border-2 border-shamrock-500"
                value={propina}
                onChange={handlePropina}
                placeholder="Propina (10% por defecto)"
              />
            </label>
          )}
        </div>

        <div className="flex flex-col">
          {/* Subtotal con propina */}
          <div className="flex justify-between bg-shamrock-700 text-white px-3 py-1 text-lg">
            <p>Subtotal:</p>
            <p>{formatPrecio(subtotal)}</p>

          </div>
          <div className="flex justify-between bg-shamrock-700 text-white px-3 py-1 text-lg">
            <p>Total:</p>
            <p>{formatPrecio(total)}</p>
          </div>
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
          <button onClick={imprimirFactura}>imprimir</button>
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
          extra={{
            total: total,
            descuento: descuento,
            metodoPago: pago,
            montoRecibido: montoRecibido,
            montoCambio: montoCambio,
            mesaDescripcion: mesaDescripcion,
          }}
        />
      </div>
    </>
  );
};

export default Pago;
