import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ioSocket } from "../Socket";

import MenuNav from "../Componentes/MenuNav";
import Factura from "../Componentes/Funcionales/Factura";
import TablaFactura from "../Componentes/Dash/Vistas/Caja/TablaFactura";

import { formatPrecio } from "../Services/formatPrecio";
import { traerProductosMesa } from "../Services/ApiMesas";

import "../Estilos/Cuenta.css";

const Cuenta = () => {
  const [pedido, setPedido] = useState([]);
  const state = useSelector((state) => state); //estado
  const { mesa } = state.canasta; //destructuración del estado
  const impresion = useRef(); //referencia para imprimir se usa en el componente factura

  const handlePrint = useReactToPrint({
    content: () => impresion.current,
    copyStyles: true,
  });


  const cargarProductosMesa = () => {
    traerProductosMesa(mesa.idMesa).then((res) => {
      //set al Pedido sin los productos cancelados:
      setPedido(res.filter((item) => item.Estado !== "Cancelado"));
    });
  };






  useEffect(() => {
    cargarProductosMesa(); //cargar productos de la mesa al iniciar la pagina
    ioSocket.on("actualizado", (data) => {
      //escuchar el evento actualizado del socket y actualizar la mesa
      console.log("actualizado", data);
      cargarProductosMesa();
    });
    return () => {
      ioSocket.off("actualizado");
    };
  }, []);

  return (
    <>
      <MenuNav />
      <div className="flex flex-col items-center justify-center p-3">
        <h3>Cuenta:</h3>
        <div className="w-full overflow-scroll">
          <div
            name="Info"
            className="flex justify-center text-center gap-3 py-2 "
          >
            <Link to="/Mesas">
              <span className="bg-elm-200 px-2 rounded-md">
                Mesa:{mesa.idMesa}
              </span>
            </Link>
            <span className="bg-shamrock-300 px-2 rounded-md">
              {formatPrecio(
                pedido.reduce((total, item) => {
                  return total + item.Precio * item.Cantidad;
                }, 0)
              )}
            </span>
          </div>
          <TablaFactura pedido={pedido} />
        </div>
        <div
          name="botones"
          className="flex justify-center text-center gap-3 py-2 "
        >
          <button
            onClick={handlePrint}
            className="bg-elm-200 px-2 rounded-md cursor-pointer hover:bg-elm-300"
          >
            Imprimir
          </button>
          <button className="bg-shamrock-300 px-2 rounded-md cursor-pointer hover:bg-shamrock-400">
            Pagar
          </button>
        </div>
        <div
          
          style={{
            display: "none",
          }}
        >
         
        </div>
      </div>
    </>
  );
};

export default Cuenta;
