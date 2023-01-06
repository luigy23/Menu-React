import { CARGAR_PEDIDOS } from "../Types/pedidoTypes";

export const cargadePedidos = (listaPedidos) => {
  return { type: CARGAR_PEDIDOS, payload: listaPedidos };
};
