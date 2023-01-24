import { format } from "date-fns";

import Pedido from "./Pedido";

import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargadePedidos } from "../../../Actions/pedidosActions";
import { SocketContext } from "../../../Contextos/SocketContext";
import axios from "axios";

const Pedidos = () => {
  const state = useSelector((state) => state); //estado
  const { pedidos } = state.pedidos;

  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const [cargado, setCargado] = useState(false);
  const socket = useContext(SocketContext);

  const api = process.env.REACT_APP_API;
  useEffect(() => {
    const recibirActualización = () => {
      setCargado(!cargado);
      console.log("actualizado");
    };
    socket.on("actualizado", recibirActualización);

    //request a la api
    axios.get(api + "/pedidos").then((response) => {
      dispatch(cargadePedidos(response.data));
      setCargado(true);
      console.log("cargados los pedidosss");
    });

    return () => {
      socket.off("actualizado", recibirActualización);
    };

    //dispacht
  }, [cargado]);
  return (
    <>
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
