import React from "react";
import { Link } from "react-router-dom";
const Item = ({ nombre, icono, link }) => {
  return (
    <Link className="w-full" to={link}>
      <div className="itemMenu">
        <span>{icono}</span> <p className="max-lg:hidden px-2">{nombre}</p>
      </div>{" "}
    </Link>
  );
};

export default Item;
