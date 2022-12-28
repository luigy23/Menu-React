import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pedido = ({ mesero, hora }) => {
  const state = useSelector((state) => state);
  const { productos, canasta, total, mesa, filtro } = state.canasta;
  const dispatch = useDispatch();

  return (
    <div className="w-full py-8">
      <div className="w-44 hover:scale-105 transition-transform">
        <div className=" cardPedido divide-y-2 ">
          <div className="w-full justify-between flex p-2 text-sm">
            {" "}
            {/* Div Datos*/}
            <h3 className=" font-semibold text-slate-50">{hora} </h3>
            <h3 className=" font-semibold text-slate-50">{mesero} </h3>
          </div>
          
          <div>
            <ul className="text-slate-50 font-semibold ">
              {canasta.map((item) => (
                <li>
                  <b>x{item.cantidad}</b> {item.titulo}
                </li>
              ))}
            </ul>
          </div>
          <div>Con papas extra y bien assado</div>
        </div>

        <div className=" rounded-md text-center bg-slate-white shadow-slate- shadow-md w-full">
          <b className="text-slate-700">{mesa}</b>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
