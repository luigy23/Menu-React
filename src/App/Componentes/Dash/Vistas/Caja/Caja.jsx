import React, { useEffect } from "react";



import Cajabtn from "./botones/Cajabtn";
import NuevaFactura from "./botones/NuevaFactura";
import Movimientos from "./Movimientos";
import { ioSocket } from "../../../../Socket";



const Caja = () => {




  return (
    <>
      <div className="gap-10 flex flex-col h-full p-4 bg-slate-100">
        <h1>Caja</h1>
        <div className="grid grid-cols-8  gap-3">
          <Cajabtn />
          <NuevaFactura/>
        </div>
 
          <Movimientos />

      </div>

    </>
  );
};

export default Caja;
