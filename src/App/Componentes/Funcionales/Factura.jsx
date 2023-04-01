import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { formatPrecio } from "../../Services/formatPrecio";
// este componente es el que se imprime
const Factura = ({ pedido, impresion }) => {
  //use selector para traer el estado de la mesa: mesa, total, productos
  const state = useSelector((state) => state); //estado
  const { mesa } = state.canasta; //destructuración del estado

  return (
    <div className="factura" ref={impresion}>
      <div className="flex justify-center text-center gap-3 py-2 ">
        <h1>Factura</h1>
      </div>
      <div className="flex justify-center text-center gap-3 py-2 ">
        <h2>Restaurante</h2>
      </div>
      <div className="flex justify-center text-center gap-3 py-2 ">
        <h3>Fecha: {new Date().toLocaleDateString()}</h3>
        <h3>Mesa:{mesa.idMesa}</h3>
      </div>
      <div className="flex justify-center  items-center  flex-col text-center gap-3 py-2 ">
        <table className="flex justify-center flex-col text-center gap-3 py-2 border-collapse w-3/4">
          <thead>
            <tr className="flex gap-2 justify-center items-center">
              <th className=" w-1/3">Producto</th>
              <th className=" w-1/3">Cantidad</th>
              <th className=" w-1/3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.map((item) => {
              const subtotal = item.Precio * item.Cantidad;
              return (
                <tr
                  className="flex gap-2 justify-center items-center bg-gray-200"
                  key={item.codProducto}
                >
                  <td className=" w-1/3">{item.Nombre}</td>
                  <td className="font-semibold w-1/3">x{item.Cantidad}</td>
                  <td className=" w-1/3">{formatPrecio(subtotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center text-center gap-3 py-2 ">
        <h7>
          Total:
          {formatPrecio(
            pedido.reduce((total, item) => {
              return total + item.Precio * item.Cantidad;
            }, 0)
          )}
        </h7>
      </div>
    </div>
  );
};

export default Factura;
