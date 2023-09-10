import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import { crearFactura } from "../../../../../Services/ApiFacturas";
import { obtenerMetodosPago } from "../../../../../Services/ApiMetodosPago";
import { formatPrecio } from "../../../../../Services/formatPrecio";
import Factura from "../../../../Funcionales/Factura";
import { ca } from "date-fns/locale";
import { useSelector } from "react-redux";



const Pago = ({ setStep, pedido, mesa }) => {
    const {user} = useSelector((state) => state.usuario);

    const [pago, setPago] = useState("efectivo");
    const [metodosPago, setMetodosPago] = useState([]);
    const [montoRecibido, setMontoRecibido] = useState(0);
    const [montoCambio, setMontoCambio] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [descuentoActivo, setDescuentoActivo] = useState(false);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      const cargarMetodosPago = async () => {
        const resultado = await obtenerMetodosPago();
        setMetodosPago(resultado.metodos_pago);
      };
      
      cargarMetodosPago();

      calcularTotal();


    }, []);

    useEffect(() => {
        calcularTotal();
        calcularCambio();



    }, [descuento, pedido])

  
    //use ref
    const impresion = useRef();
  
    const imprimirFactura = useReactToPrint({
        content: () => impresion.current,
        copyStyles: true,
      });
    




  
  
  
    const enviarFactura = async () => {
      //verificar que el monto recibido sea mayor al total
      if (montoRecibido < total) {
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
        idUsuario: user,
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
        setMontoRecibido(total);
      }
    };
  
    const calcularTotal = () => {

        let totalCalculado = 0;
      
        pedido.forEach(item => {
          if(item.Estado !== 'Cancelado' && item.Estado !== 'Pendiente') {
            totalCalculado += item.Precio * item.Cantidad; 
          }
        });
      
        if(descuento && descuentoActivo) {
          totalCalculado -= parseInt(descuento);
        }
      
        // Guardar el total calculado en el estado
    
        setTotal(totalCalculado);
        // Retornar el total calculado (por si se quiere usar en otro lado)
        return totalCalculado;
      }
  
    const calcularCambio = (recibido = montoRecibido) => {
    
      const cambio = recibido - calcularTotal();
      setMontoCambio(cambio);

  
    };
  
    const handleMontoRecibido = async (e) => {
      if (pago === "Efectivo") {
        calcularCambio(e.target.value);
      }
        setMontoRecibido(e.target.value);
    };

            

    const handleDescuento = (e) => {
        // if (descuentoActivo) {
        
        // setDescuento(e.target.value);
        // calcularTotal();

        // //para asegurarnos que el cambio se actualice en tiempo real al cambiar el descuento es:
        // //calcularCambio(montoRecibido); esto no funciona porque el monto recibido no se actualiza en tiempo real
        // //por lo que se debe obtener el monto recibido del input
        // calcularCambio(document.querySelector('input[name="montoRecibido"]').value);
        // }

        setDescuento(e.target.value);
        



    }
   const handleDescuentoActivo = (e) => {
        setDescuentoActivo(e.target.checked);
        if (!e.target.checked) {
        setDescuento(0);
        }
    }
  
  
  
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
          <div className="flex gap-3">
            <label className="flex gap-3">
              Descuento:
              <input
                type="checkbox"
                onChange={handleDescuentoActivo}
              />
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
  
          <div className="flex flex-col">
            <label className="label-total">
              SubTotal: {formatPrecio(total)}
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
            extra={{
              total: total,
              descuento: descuento,
              metodoPago: pago,
              montoRecibido: montoRecibido,
              montoCambio: montoCambio,
            
            }}
            />
  
          </div>
      </>
    );
  };

    export default Pago;