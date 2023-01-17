import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NavBar from "../Componentes/Dash/NavBar";
import Pedidos from "../Componentes/Dash/Vistas/Pedidos";
import { cargadePedidos } from "../Actions/pedidosActions";
import {SocketContext} from "../Contextos/SocketContext.js"
import {useContext} from "react";

const Admin = () => {

  const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
  const [cargado, setCargado] = useState(false);
  const socket = useContext(SocketContext);



  const state = useSelector((state) => state);
  //const socket = useContext(SocketContext);



  const api = process.env.REACT_APP_API;
  useEffect(() => {

    const recibirActualización = () =>{
      setCargado(!cargado)
      console.log("actualizado")

    }
    socket.on('actualizado', recibirActualización);


    //request a la api
    axios
      .get(api + "/pedidos")
      .then((response) => {
        dispatch(cargadePedidos(response.data))
        setCargado(true)
        console.log("cargados los pedidosss")
      });


      return ()=>{

        socket.off('actualizado', recibirActualización);
      }

    //dispacht
  }, [cargado]);

  return (
    <div className="  bg-white justify-center text-center w-full min-h-screen ">
      <div className=" grid-cols-12 w-full min-h-[100vh] grid pr-2">
        <NavBar />
        <div className=" col-span-10 pl-5 w-full justify-center text-center flex-col flex ">
          <Pedidos />
        </div>
      </div>
    </div>
  );
};

export default Admin;
