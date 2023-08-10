import React from 'react'
import "../../../../../Estilos/Tabs.css"
const Filtros = () => {

    const handleClick = (e) => {
        console.log(e.target.innerText);
    }

    return (

        <ul className="links">
            <li onClick={handleClick}
            >
                ULtimos
            </li>
            <li onClick={handleClick}>
                Ingresos
            </li>
            <li onClick={handleClick}>
                Fecha
            </li>
        </ul>


    )
}

export default Filtros