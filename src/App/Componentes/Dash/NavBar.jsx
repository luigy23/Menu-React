import React from "react";
import Item from "./NavBar/Item";
import logo from "../../Assets/duo2.png"

const NavBar = () => {
  const menu = [
    { nombre: "Caja", icono: "💰", link:"/" },
    { nombre: "Pedidos", icono: "📝", link:"" },
    { nombre: "Productos", icono: "🍛", link:"productos" },
    { nombre: "Mesas", icono: "🎲" },
  ];

  return (<>
    <nav className="sideBar">
      <div className="w-full flex items-center flex-col  ">
      <img className="imgProducto object-cover rounded-3xl w-36 " src={logo} alt="Imagen" />
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
