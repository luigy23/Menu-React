import React, { useState } from "react";

const ToggleButton = () => {
  // Declaramos el estado inicial a "Disponible"
  const [status, setStatus] = useState("Disponible");

  // función para cambiar el estado
  const handleClick = () => {
    status === "Disponible" ? setStatus("Agotado") : setStatus("Disponible");
  };

  return (
    <>
      <div className="toggle">
        <input type="checkbox" className="toggle__input" onChange={handleClick} />
        <span className="toggle__span"></span>
      </div>
      <input type="hidden" name="status" value={status} />
    </>
  );
};

export default ToggleButton;