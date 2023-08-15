import React from "react";
import Item from "./NavBar/Item";
import logo from "../../Assets/duo2.png"
import { Link } from "react-router-dom";
const NavBar = () => {
  const menu = [
    { nombre: "Caja", icono: "💰", link:"" },
    { nombre: "Pedidos", icono: "📝", link:"pedidos" },
    { nombre: "Productos", icono: "🍛", link:"productos" },
    { nombre: "Categorias", icono: "🍔", link:"categorias" },
    { nombre: "Mesas", icono: "🎲" },
    { nombre: "Usuarios", icono: "👨‍💻", link:"usuarios" },
    { nombre: "Metodos de pago", icono: "💳", link:"metodosPago" },
  ];

  return (<>
    <nav className="sideBar">
      <div className="w-full flex items-center flex-col  ">
      <Link  to={"/"}>
      <img className=" object-cover rounded-3xl  w-32" src={logo} alt="Imagen" />
      </Link>
      <h3>una App Cualquiera</h3>
      </div>

      {menu.map((item, index) => (
        <Item key={index} nombre={item.nombre} icono={item.icono} link={item.link} />
      ))}
    </nav>


    </>

  );
};

export default NavBar;
