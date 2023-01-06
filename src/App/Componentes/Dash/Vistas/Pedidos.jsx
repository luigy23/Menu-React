import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Pedido from "./Pedido";

const Pedidos = () => {
  const state = useSelector((state) => state); //estado
  const { pedidos } = state.pedidos;

  useEffect(() => {
    //request a la api
    console.log("cargado la interfaz");
    console.log(pedidos)
    //dispacht
  }, [pedidos]);

  return (
    <>
      <div className="contenedorPedidos neomorfismo">
        <div className="Pedidos w-full flex flex-wrap">
          {!pedidos.length
            ? "Cargando..."
            : pedidos.map((pedido) => (
                <Pedido
                  key={pedido.idPedido}
                  mesa={pedido.idMesa}
                  mesero={pedido.Usuario}
                  hora={format(new Date(pedido.Fecha), "h:mm a")}
                  productos = {pedido.Productos}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
