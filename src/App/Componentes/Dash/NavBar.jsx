import React from "react";
import Item from "./NavBar/Item";


const NavBar = () => {
  const menu = [
    { nombre: "Caja", icono: "💰", link:"/" },
    { nombre: "Pedidos", icono: "📝" },
    { nombre: "Productos", icono: "🍛" },
    { nombre: "Mesas", icono: "🎲" },
  ];

  return (<>
    <nav className="sideBar">
      {menu.map((item, index) => (
        <Item key={index} nombre={item.nombre} icono={item.icono} link={item.link} />
      ))}
    </nav>


    </>

  );
};

export default NavBar;
