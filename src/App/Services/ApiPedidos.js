import axios from "axios";
const api = process.env.REACT_APP_API;

export const nuevoPedido = async (pedido) => {
  const res = await axios.post(api + "/pedidos", pedido);
  const pedidoCreado = res.data;
  return pedidoCreado;
};


export const traerPedidos = async (estado, id=null, limit= null) => {
    if (id) {
        const res = await axios(api + "/pedidos", { params: { estado, id, limit } });
        const pedidos = res.data;
        return pedidos;
    }
  const res = await axios(api + "/pedidos", { params: { estado, limit:limit } });
  const pedidos = res.data;
  return pedidos;
};

export const traerPedido = async (id, estado=null, limit=null) => {
  const res = await axios(api + "/pedidos", { params: { estado, id, limit } });
  const pedidos = res.data;
  return pedidos;
}


export const añadirProductosPedido = async (idMesa, productos) => {
  const res = await axios.put(api + "/pedidos/", { idMesa, productos });
  const pedidoActualizado = res.data;
  return pedidoActualizado;
}
