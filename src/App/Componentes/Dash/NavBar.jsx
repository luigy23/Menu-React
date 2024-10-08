import React from "react";
import Item from "./NavBar/Item";
import logo from "../../Assets/Logo.jpg";
import { Link } from "react-router-dom";
const NavBar = () => {
  const menu = [
    { nombre: "Caja", icono: "💰", link:"" },
    { nombre: "Pedidos", icono: "📝", link:"pedidos" },
    { nombre: "Productos", icono: "🍛", link:"productos" },
    { nombre: "Categorias", icono: "🍔", link:"categorias" },
    { nombre: "Mesas", icono: "🎲", link:"mesas" },
    { nombre: "Usuarios", icono: "👨‍💻", link:"usuarios" },
    { nombre: "Metodos de pago", icono: "💳", link:"metodosPago" },
    { nombre: "Reportes", icono: "📊", link:"reportes" },

  ];

  return (<>
    <nav className="sideBar">
      <div className="w-full flex items-center flex-col  ">
      <Link  to={"/"}>
      <img className=" object-cover rounded-3xl  w-32" src={logo} alt="Imagen" />
      </Link>
      <h3>Casa Blanca</h3>
      </div>

      {menu.map((item, index) => (
        <Item key={index} nombre={item.nombre} icono={item.icono} link={item.link} />
      ))}
    </nav>


    </>

  );
};

export default NavBar;
