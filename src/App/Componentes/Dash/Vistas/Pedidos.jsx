import { format } from "date-fns";

import Pedido from "./Pedido";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ioSocket } from "../../../Socket";

const Pedidos = () => {
  //const state = useSelector((state) => state); //estado
  //const { pedidos } = state.pedidos;

  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");
  
  const [pedidos, setPedidos] = useState([])
  const api = process.env.REACT_APP_API;

  const traerLosPedidos = (estado) =>{

    axios.get(api + "/pedidos",{ params: { estado } })

    .then((response) => {
      setPedidos(response.data)
      console.log("cargados los pedidosss");
    }).catch(function (error) {
      console.log("error en get /pedidos:",error);
    })
    }

  const todosPedidos = ()=>{
    traerLosPedidos(null)
}

  const recibirActualización = () => {
    traerLosPedidos()
    console.log("actualizado");
  };

  useEffect(() => {

   traerLosPedidos(estadoPedido)

    ioSocket.on("actualizado", recibirActualización);
    //request a la api

    
    ;

    return () => {
      ioSocket.off("actualizado", recibirActualización);
    };

    //dispacht
  }, []);
  return (
    <>
   
    <button onClick={todosPedidos} className="bg-zinc-800 text-white">Cargar pedidos</button>
      <div className="contenedorPedidos scrollbar neomorfismo">
        <div className="Pedidos w-full flex flex-wrap">
          {!pedidos.length
            ? "Cargando..."
            : pedidos.map((pedido, index) => (
                <Pedido
                  key={index}
                  pedido={pedido}
                  hora={format(new Date(pedido.Fecha), "h:mm a")}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
