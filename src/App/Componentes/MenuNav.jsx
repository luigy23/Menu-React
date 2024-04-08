import React from "react";
import "../Estilos/MenuNav.css";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  {ReactComponent as IconoSilla } from "../Assets/sillas.svg" 
import  {ReactComponent as IconoMenu } from "../Assets/menu.svg" 

import { useSelector } from "react-redux";
import Usuario from "./Usuario/Usuario";
import Notificaciones from "./Notificaciones";



const MenuNav = () => {
  const cerrarSesion = () => {
    Cookies.remove('token')
}

//importar estado de usuario de redux



  return (
    <div className="menu-nav ">
      <ul>
        <Link title="Mesas"  className="Link" to={"/"}>
          <IconoSilla className="iconoMenu "/>
        </Link>
        
        <Link title="Productos" className="Link" to={"/Menu"}>
        <IconoMenu className="iconoMenu "/>

        </Link>
        <Usuario/>
        <Notificaciones/>
        


        
      </ul>
    </div>
  );
};

export default MenuNav;
