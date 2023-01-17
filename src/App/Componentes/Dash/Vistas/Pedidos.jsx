import { format } from "date-fns";
import { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Pedido from "./Pedido";
import { SocketContext } from "../../../Contextos/SocketContext";

const Pedidos = () => {
  const state = useSelector((state) => state); //estado
  const { pedidos } = state.pedidos;


  useEffect(() => {
    //request a la api

    console.log("cargado la interfaz");
    //console.log(pedidos);
    //dispacht




  }, [pedidos]);

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
