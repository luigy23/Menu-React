import axios from "axios";
const api = process.env.REACT_APP_API;

export const traerMesas = async () => {
  try {
    const res = await axios(api + "/mesas");
    const mesas = res.data;
    return mesas;
  } catch (error) {
    console.log(error);
  }
};

export const traerProductosMesa = async (id) => {
    try {
        const res = await axios(api + "/mesas/pedido/"+id);
        const productos = res.data;
        return productos;
    } catch (error) {
        console.log(error);
    }
};

export const CrearMesa = async (mesa) => {
  try {
    const res = await axios.post(api + "/mesas", mesa);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export const ActualizarEstadoMesa = async (mesa) => {
  try {
    const res = await axios.put(api + "/mesas/estado", mesa);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const ActualizarMesa = async (mesa) => {
  try {
    const res = await axios.put(api + "/mesas", mesa);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}