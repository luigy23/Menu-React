//Este componente fue generado por IA

import React, { useState, useEffect } from 'react';
import { crearMetodoPago, obtenerMetodosPago, actualizarMetodoPago, eliminarMetodoPago } from '../../../../Services/ApiMetodosPago';

const MetodosPagoAdmin = () => {
  const initialState = { Nombre: '', Descripcion: '', Estado: '' };
  const [metodosPago, setMetodosPago] = useState([]);
  const [metodoPago, setMetodoPago] = useState(initialState);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idMetodoPago, setIdMetodoPago] = useState('');

  useEffect(() => {
    const cargarMetodosPago = async () => {
      const resultado = await obtenerMetodosPago();
      setMetodosPago(resultado.metodos_pago);
    };
    cargarMetodosPago();
  }, []);

  const handleChange = (event) => {
    setMetodoPago({ ...metodoPago, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (modoEdicion) {
      const resultado = await actualizarMetodoPago(idMetodoPago, metodoPago.Nombre, metodoPago.Descripcion, metodoPago.Estado);
      if (resultado.message === 'Método de pago actualizado') {
        let metodosActualizados = [...metodosPago];
        let metodoIndex = metodosActualizados.findIndex((metodo) => metodo.idMetodoPago == idMetodoPago);
        if (metodoIndex !== -1) {
          metodosActualizados[metodoIndex].Nombre = metodoPago.Nombre;
          metodosActualizados[metodoIndex].Descripcion = metodoPago.Descripcion;
          metodosActualizados[metodoIndex].Estado = metodoPago.Estado;
          setMetodosPago(metodosActualizados);
          setMetodoPago(initialState);
          setIdMetodoPago('');
          setModoEdicion(false);
        }
      }
    } else {
      const resultado = await crearMetodoPago(metodoPago.Nombre, metodoPago.Descripcion, metodoPago.Estado);
      if (resultado.message === 'Método de pago creado') {
        const nuevoMetodoPago = {
          idMetodoPago: resultado.idMetodoPago,
          Nombre: metodoPago.Nombre,
          Descripcion: metodoPago.Descripcion,
          Estado: metodoPago.Estado,
        };
        setMetodosPago([...metodosPago, nuevoMetodoPago]);
        setMetodoPago(initialState);
      }
    }
  };

  const handleEditar = (metodoPago) => {
    setModoEdicion(true);
    setIdMetodoPago(metodoPago.idMetodoPago);
    setMetodoPago({
      Nombre: metodoPago.Nombre,
      Descripcion: metodoPago.Descripcion,
      Estado: metodoPago.Estado,
    });
  };

  const handleEliminar = async (idMetodoPago) => {
    const resultado = await eliminarMetodoPago(idMetodoPago);
    if (resultado.message === 'Método de pago eliminado') {
      let metodosActualizados = [...metodosPago];
      metodosActualizados = metodosActualizados.filter((metodo) => metodo.idMetodoPago != idMetodoPago);
      setMetodosPago(metodosActualizados);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-medium mb-4"> Métodos de pago </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="Nombre">
            Nombre
          </label>
          <input
            className="w-full border rounded py-2 px-3"
            name="Nombre"
            id="Nombre"
            type="text"
            placeholder="Ingresa el nombre del método de pago"
            value={metodoPago.Nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="Descripcion">
            Descripción
          </label>
          <textarea
            className="w-full border rounded py-2 px-3"
            name="Descripcion"
            id="Descripcion"
            placeholder="Ingresa la descripción del método de pago"
            value={metodoPago.Descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="Estado">
            Estado
          </label>
          <input
            className=" w-full border rounded py-2 px-3"
            name="Estado"
            id="Estado"
            type="text"
            placeholder="Ingresa el estado del método de pago"
            value={metodoPago.Estado}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-2"
          type="submit"
        >
          {modoEdicion ? 'Actualizar' : 'Agregar'}
        </button>
        {modoEdicion && (
          <button
            className="bg-gray-500 text-white font-medium py-2 px-4 rounded"
            onClick={() => {
              setMetodoPago(initialState);
              setModoEdicion(false);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="border-collapse border-2 border-gray-500 w-full">
        <thead>
          <tr>
            <th className="border-collapse border-2 border-gray-500 p-2 text-left">ID</th>
            <th className="border-collapse border-2 border-gray-500 p-2 text-left">Nombre</th>
            <th className="border-collapse border-2 border-gray-500 p-2 text-left">Descripción</th>
            <th className="border-collapse border-2 border-gray-500 p-2 text-left">Estado</th>
            <th className="border-collapse border-2 border-gray-500 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {metodosPago.map((metodoPago) => (
            <tr key={metodoPago.idMetodoPago}>
              <td className="border-collapse border-2 border-gray-500 p-2">{metodoPago.idMetodoPago}</td>
              <td className="border-collapse border-2 border-gray-500 p-2">{metodoPago.Nombre}</td>
              <td className="border-collapse border-2 border-gray-500 p-2">{metodoPago.Descripcion}</td>
              <td className="border-collapse border-2 border-gray-500 p-2">{metodoPago.Estado}</td>
              <td className="border-collapse border-2 border-gray-500 p-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-1 px-2 rounded mr-2"
                  onClick={() => handleEditar(metodoPago)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded"
                  onClick={() => handleEliminar(metodoPago.idMetodoPago)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetodosPagoAdmin;
