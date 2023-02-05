import React from "react";
import { Outlet } from "react-router";
import { useEffect } from "react";

import NavBar from "../Componentes/Dash/NavBar";
import Pedidos from "../Componentes/Dash/Vistas/Pedidos";
import { Productos } from "../Componentes/Dash/Vistas/Productos/Productos";


const Admin = (props) => {
useEffect(() => {
  console.log("cargando admin")

  return () => {
    console.log("cargado")
  }
}, [])


  return (
    <div className="  bg-white justify-center text-center w-full min-h-screen h-screen ">
      <div className=" grid-cols-12 w-full min-h-[100vh] grid pr-2">
        <NavBar />
        <div className=" col-span-10 pl-5 w-full justify-center text-center flex-col flex ">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
