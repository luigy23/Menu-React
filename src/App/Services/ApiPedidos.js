import axios from "axios";
const api = process.env.REACT_APP_API;

export const traerPedidos = async (estado, id=null) => {
    if (id) {
        const res = await axios(api + "/pedidos", { params: { estado, id } });
        const pedidos = res.data;
        return pedidos;
    }
  const res = await axios(api + "/pedidos", { params: { estado } });
  const pedidos = res.data;
  return pedidos;
};

