import React from "react";
import "../Estilos/MenuNav.scss";
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faUtensils, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  {ReactComponent as IconoSilla } from "../Assets/sillas.svg" 
import  {ReactComponent as IconoMenu } from "../Assets/menu.svg" 



const MenuNav = () => {
const location = useLocation()
  return (
    <div className="menu-nav">
      <ul>
        <Link className="Link" to={"Mesas"}>
          <IconoSilla className="icon"/>
        </Link>
        <Link className="Link" to={"/"}>
        <IconoMenu className="icon"/>

        </Link>
      </ul>
    </div>
  );
};

export default MenuNav;
