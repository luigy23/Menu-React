import React from "react";
import Item from "./NavBar/Item";
import logo from "../../Assets/logo.jpeg"

const NavBar = () => {
  const menu = [
    { nombre: "Caja", icono: "💰", link:"/" },
    { nombre: "Pedidos", icono: "📝" },
    { nombre: "Productos", icono: "🍛" },
    { nombre: "Mesas", icono: "🎲" },
  ];

  return (<>
    <nav className="sideBar">
      <div className="w-full flex items-center flex-col  ">
      <img className="imgProducto rounded-3xl w-36" src="https://cdn.midjourney.com/18a004d6-e2bc-443f-8ea2-36021a81fb78/grid_0.png" alt="Imagen" />
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
