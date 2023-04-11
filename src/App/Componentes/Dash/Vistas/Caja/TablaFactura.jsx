import React from 'react'
import { formatPrecio } from '../../../../Services/formatPrecio';

const TablaFactura = ({pedido}) => {

    const estado = {
        //objeto con los estados de los productos
        Pendiente: "⏳",
        Listo: "✅",
        Cancelado: "❌",
      };

  return (
    <table className="Tabla_Factura">
    <thead>
      <tr>
        <th>E</th>
        <th>Producto</th>
        <th>Cant.</th>
        <th>Precio u.</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {
        //codigo de una forma de hacerlo en la que si se repite el nombre del item se suman las cantidades:
        pedido.map((item) => {
          const subtotal = item.Precio * item.Cantidad;
          return (
            <tr key={item.codProducto}>
              <td>{estado[item.Estado]}</td>
              <td>{item.Nombre}</td>
              <td>{item.Cantidad}</td>
              <td>{formatPrecio(item.Precio)}</td>
              <td>{formatPrecio(subtotal)}</td>
            </tr>
          );
        })
      }
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="4">Total</td>
        <td>
          {formatPrecio(
            pedido.reduce((total, item) => {
              //no sumar si el item esta cancelado
              if (item.Estado === "Cancelado") {
                return total;
              }
              return total + item.Precio * item.Cantidad;
            }, 0)
          )}
        </td>
      </tr>
    </tfoot>
  </table>
  )
}

export default TablaFactura