import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MenuNav from '../Componentes/MenuNav'
import { formatPrecio } from '../Services/formatPrecio'
import { traerProductosMesa } from '../Services/ApiMesas'
import { Link } from 'react-router-dom'
import "../Estilos/Cuenta.css"
import { ioSocket } from '../Socket'
const Cuenta = () => {

  const [pedido, setPedido]= useState([])
  const state = useSelector((state) => state); //estado
  const { total, mesa } = state.canasta; //destructuración del estado
 
  const [totalCuenta, setTotalCuenta] = useState(0)

  const estado = {
    Pendiente:"⏳" ,
    Listo: "✅"

  };

  const cargarProductosMesa = () => {
    traerProductosMesa(mesa).then((res) => {
      console.log(res)
      setPedido(res)
    })
  }
  /*Tutotial como implementar un total:
primero se crea un estado para el total, en este caso es totalCuenta
luego se crea una funcion que se encargue de calcular el total, en este caso es cargarProductosMesa
y por ultimo se llama a la funcion en el useEffect, para que se ejecute cada vez que se renderice el componente

  
  */



  useEffect(() => {

    cargarProductosMesa()

  
  // Verificar si hay mesa seleccionada:
 ioSocket.on("meseros", (data) => {
    console.log("meseros", data)
    cargarProductosMesa()
  })

 

 return () => {
    ioSocket.off("meseros")
  }


  }, [])




  return (
    <>
    <MenuNav/>
    <div className="flex flex-col items-center justify-center p-3">
    <h3>Cuenta:</h3>
    <div name="Info" className="flex justify-center text-center gap-3 py-2 ">
            <Link to="/Mesas">
            <span className="bg-elm-200 px-2 rounded-md">Mesa:{mesa}</span>
            </Link>
            <span className="bg-shamrock-300 px-2 rounded-md">
             {formatPrecio(total)}
            </span>
    </div>



    <div className='w-full overflow-scroll'>
    {/* Tabla de ejemplo de una factura: */}
    <table className='Tabla_Factura'>
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
        {pedido.map((item) => {
          const subtotal = item.Precio * item.Cantidad;
         // setTotalCuenta((total)=>total+subtotal)
          return (
            <tr key={item.codProducto}>
              {/* Estilo en linea para el td estado: */}
              <td>{estado[item.Estado]}</td>
              <td>{item.Nombre}</td>
              <td>{item.Cantidad}</td>
              <td>{formatPrecio(item.Precio)}</td>
              <td>{formatPrecio(subtotal)}</td>
            </tr>
          );
        }
        )}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan="4">Total</td>
          <td>{
            formatPrecio(
            pedido.reduce((total, item) => {
              return  total + item.Precio * item.Cantidad;
            }, 0))
          }</td>
          
       
        </tr>
      </tfoot>
    </table>

    </div>



    </div>
    
    </>
    
  )
}

export default Cuenta