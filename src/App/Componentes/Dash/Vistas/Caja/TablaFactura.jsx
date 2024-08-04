import React from 'react'
import { formatPrecio } from '../../../../Services/formatPrecio';
import { productoCancelado } from '../../../../Services/ApiProductos';
import { useModal } from '../../../../Hooks/useModal';
import Modal from '../../../Modal';
import { ToastContainer, toast } from 'react-toastify';

const TablaFactura = ({pedido, isMesero}) => {


      const cancelarProducto = (e) => {
        //cancelar un producto
        const codProducto = e.target.value;
        const idPedido = pedido[0].idPedido;
        productoCancelado({ codProducto, idPedido });
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
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        //codigo de una forma de hacerlo en la que si se repite el nombre del item se suman las cantidades:
        pedido.map((item) => {
          const subtotal = item.Precio * item.Cantidad;
          return (
            <ItemTablaFactura item={item} subtotal={subtotal} />
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

              if (!isMesero) {
                if (item.Estado === "Pendiente") {
                  return total
                }
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


const ItemTablaFactura = ({item, subtotal}) => {
  
  //modal
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const estado = {
    //objeto con los estados de los productos
    Pendiente: "⏳",
    Listo: "✅",
    Cancelado: "❌",
  };

  const clicDerecho = (e) => {
    e.preventDefault();
    openModal();
  };

  const cancelarProducto = () => {
    productoCancelado({ codProducto: item.codProducto, idPedido: item.idPedido, idRegistro: item.idRegistro });
    toast.success("Producto Cancelado");

  }


  return (
    <>
    <tr key={item.codProducto} className='hover:bg-slate-300' onContextMenu={clicDerecho}
    
    >
    <td>{estado[item.Estado]}</td>
    <td>{item.Nombre}</td>
    <td>{item.Cantidad}</td>
    <td>{formatPrecio(item.Precio)}</td>
    <td>{formatPrecio(subtotal)}</td>

  </tr>

  {
    isOpenModal && (
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
      <div className="flex flex-col items-center justify-center">
        <h3>¿Cancelar Producto?</h3>
        <div className="flex gap-2">
          <button
            onClick={() => cancelarProducto(item.codProducto)}
            className="btn-cancelar"
          >
            Si
          </button>
        </div>
        </div>
      </Modal>
    )
    

  }
  <ToastContainer />

  </>
  )
}

