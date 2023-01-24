import React from "react";

import { useEffect } from "react";

import NavBar from "../Componentes/Dash/NavBar";
import Pedidos from "../Componentes/Dash/Vistas/Pedidos";


const Admin = () => {
useEffect(() => {
  console.log("cargando admin")

  return () => {
    console.log("cargado")
  }
}, [])


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
