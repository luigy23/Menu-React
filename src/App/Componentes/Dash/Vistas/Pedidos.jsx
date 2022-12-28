import React from "react";
import Pedido from "./Pedido";

const Pedidos = () => {
  return (
    <>
      <div className="neomorfismo w-full bg-white h-4/5 rounded-3xl py-8 items-start text-start px-5">
        <h1 className="font-semibold text-xl">Pedidos en cola:</h1>

    <Pedido mesero={"Juan"} hora={"12:43pm"} />
      </div>
    </>
  );
};

export default Pedidos;
