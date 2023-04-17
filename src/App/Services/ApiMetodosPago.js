import axios from 'axios';
const api = process.env.REACT_APP_API;

export const crearMetodoPago = async (nombre, descripcion, estado) => {
    const res = await axios.post(`${api}/metodosPago`, { Nombre: nombre, Descripcion: descripcion, Estado: estado });
    return res.data;
  };
  
  export const obtenerMetodosPago = async () => {
    const res = await axios.get(`${api}/metodosPago`);
    return res.data;
  };

  export const obtenerMetodoPagoPorId = async (id) => {
    const res = await axios.get(`${api}/metodosPago/${id}`);
    return res.data;
  };
  
  export const actualizarMetodoPago = async (id, nombre, descripcion, estado) => {
    const res = await axios.put(`${api}/metodosPago/${id}`, { Nombre: nombre, Descripcion: descripcion, Estado: estado });
    return res.data;
  };

  export const eliminarMetodoPago = async (id) => {
    const res = await axios.delete(`${api}/metodosPago/${id}`);
    return res.data;
  };
  
  