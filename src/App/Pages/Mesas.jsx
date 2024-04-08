import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Mesa from '../Componentes/Mesa';
import MenuNav from "../Componentes/MenuNav";
import { traerMesas } from '../Services/ApiMesas';
import { ioSocket } from '../Socket';

export const Mesas = () => {
  const state = useSelector((state) => state);
  const [mesas, setMesas] = useState([]);
  const [filtro, setFiltro] = useState(""); // Estado para almacenar el término de búsqueda

  const cargarMesas = () => {
    traerMesas()
      .then((mesas) => {
        setMesas(mesas);
      });
  };

  useEffect(() => {
    cargarMesas();

    ioSocket.on("mesas", cargarMesas); // Cambiado para usar la función cargarMesas

    return () => {
      ioSocket.off("mesas", cargarMesas);
    };
  }, []);

  // Filtramos las mesas basándonos en el término de búsqueda
  const mesasFiltradas = mesas.filter(mesa =>
    mesa.Descripcion.toLowerCase().includes(filtro.toLowerCase()) // Asumiendo que las mesas tienen una propiedad 'nombre' para filtrar
  );

  return (
    <>
      <MenuNav/>
      <main className=' flex flex-col items-center text-center w-full bg-slate-700 h-screen py-8'>

        <h2 className='text-xl  text-white'>Selecciona una Mesa</h2>
        <div className='p-4'>
          {/* Campo de búsqueda */}
          <input
            type="text"
            placeholder="Buscar mesa"
            className="p-2 rounded w-full md:w-96"
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className='flex justify-center flex-wrap gap-2 p-2'>
          {
            mesasFiltradas.map((mesa, index) => (
              <Mesa
                key={index}
                Mesa={mesa}
              />
            ))
          }
        </div>
      </main>
    </>
  );
};
