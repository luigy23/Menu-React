import { format } from "date-fns";

import Pedido from "./Pedido";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ioSocket } from "../../../Socket";
import { traerPedidos } from "../../../Services/ApiPedidos";
const Pedidos = () => {
  //const state = useSelector((state) => state); //estado
  //const { pedidos } = state.pedidos;

  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  const [pedidos, setPedidos] = useState([]);

  const traerLosPedidos = (estado) => {
    traerPedidos(estado).then((pedidos) => {
      setPedidos(pedidos);
    });
  };




  const seleccionarEstado = (e) => {
    setEstadoPedido(e.target.value);
    traerLosPedidos(e.target.value);
  };

  const recibirActualización = () => {
    traerLosPedidos(estadoPedido);
    console.log("actualizado");
  };

  useEffect(() => {
    traerLosPedidos("Pendiente");

    ioSocket.on("actualizado", recibirActualización);
    //request a la api

    return () => {
      ioSocket.off("actualizado", recibirActualización);
    };

    //dispacht
  }, []);
  return (
    <>
      <form className="flex  gap-4">
        <label className="font-semibold">Seleccionar Estado Pedido</label>
        <label
          className={`label-metodo-pago ${
            estadoPedido === "Pendiente" ? "label-pago-selected" : ""
          }`}
        >
          Pendiente
          <input type="radio" name="estado" value="Pendiente" onChange={seleccionarEstado} />
        </label>
        <label
          className={`label-metodo-pago ${
            estadoPedido  ?  "" :"label-pago-selected"
          }`}
        >
          Todos
          <input type="radio" name="estado" value={null}  onChange={seleccionarEstado} />
        </label>

      </form>

      <div className="contenedorPedidos scrollbar neomorfismo">
        <div className="Pedidos w-full flex flex-wrap">
          {!pedidos.length
            ? "Cargando..."
            : pedidos.map((pedido, index) => (
                <Pedido
                  key={index}
                  pedido={pedido}
                  hora={format(new Date(pedido.Fecha), "h:mm a")}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
