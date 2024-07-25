import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { formatPrecio } from "../../Services/formatPrecio";
// este componente es el que se imprime
const Factura = ({ pedido, impresion, extra }) => {
  //use selector para traer el estado de la mesa: mesa, total, productos
  const {total, descuento, montoRecibido, montoCambio, metodoPago, mesaDescripcion} = extra;

  return (
    <div className="factura" ref={impresion}>
      <div className="flex flex-col text-center gap-2">
        <h1>Factura</h1>
        <h3>Metodo Pago:{metodoPago}</h3>
        <h2>Restaurante</h2>
        <h3>Fecha: {new Date().toLocaleDateString()}</h3>
        <h3>Mesa:{mesaDescripcion}</h3>
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
              if (item.Estado === "Cancelado") return null;
              if (item.Estado === "Pendiente") return null;

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
      <div className="flex flex-col justify-center items-center w-full  text-left gap-1 py-2 ">
        {/* div para alinar los textos a la izquierda: */}

        <h7>
          SubTotal:{" "}
          {formatPrecio(
            pedido.reduce((total, item) => {
              if (item.Estado === "Cancelado") return total;
              if (item.Estado === "Pendiente") return total;
              return total + item.Precio * item.Cantidad;
            }, 0)
          )}
        </h7>
        <h7> Descuento: {formatPrecio(descuento)}</h7>
        <h7> <b>Total</b>: {formatPrecio(total)}</h7>

      </div>
    </div>
  );
};

export default Factura;
