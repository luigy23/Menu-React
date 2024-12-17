import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { formatPrecio } from "../../Services/formatPrecio";
import logo from "../../Assets/Logo.jpg";
// este componente es el que se imprime
const Factura = ({ pedido, impresion, extra }) => {
  //use selector para traer el estado de la mesa: mesa, total, productos
  const {total, descuento, montoRecibido, montoCambio, metodoPago, mesaDescripcion} = extra;

  return (
    <div className="w-60 " ref={impresion}>

      <div className="flex flex-col text-center text-xs gap-2 items-center">
      <img className=" object-cover rounded-3xl  w-32" src={logo} alt="Imagen" />


      <h2 className="font-semibold">Restaurante Casa Blanca</h2>

        <p>Metodo Pago: {metodoPago}</p>
        <p>Fecha: {new Date().toLocaleString()}</p>
        <h3>Mesa:{mesaDescripcion}</h3>
       
      </div>
      <div className="flex justify-center  items-center  flex-col text-center gap-3 py-2 ">
        <table className="flex justify-center text-xs flex-col text-center gap-3 py-2 border-collapse w-3/4">
          <thead>
            <tr className="flex gap-2 justify-center items-center font-semibold">
              <th className=" w-1/3 mr-1">Producto</th>
              <th className=" w-1/3 mr-1">Cantidad</th>
              <th className=" w-1/3 mr-1">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.map((item) => {
              if (item.Estado === "Cancelado") return null;
              if (item.Estado === "Pendiente") return null;

              const subtotal = item.Precio * item.Cantidad;
              return (
                <tr
                  className="flex gap-2 justify-center items-center "
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
      <div className="flex flex-col justify-center text-xs items-center w-full  text-left gap-1 py-2 ">
        {/* div para alinar los textos a la izquierda: */}
        <h7> <b>Total</b>: {formatPrecio(total)}</h7>
        {
          descuento > 0 &&
        <h7> Descuento: {formatPrecio(descuento)}</h7>
}
        <h7> Propina: {formatPrecio(extra.propina)}</h7>        
        <h7>
         <b>SubTotal</b>: {formatPrecio(extra.subtotal)}
        </h7>
        <p>------------------------------------</p>
        <h7> Recibido: {formatPrecio(montoRecibido)}</h7>
        {
          montoCambio > 0 &&
        <h7> Cambio: {formatPrecio(montoCambio)}</h7>}
        

      </div>
    </div>
  );
};

export default Factura;
