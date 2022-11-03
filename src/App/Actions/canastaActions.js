import {
  AÑADIR_A_CANASTA,
  BORRAR_TODOS_CANASTA,
  BORRAR_UNO_CANASTA,
  BUSCAR_PRODUCTOS,
  CALCULAR_TOTAL,
  CARGAR_PRODUCTOS,
  SELECCIONAR_MESA,
} from "../Types";

export const cargadeProductos = (productList) => {
  return { type: CARGAR_PRODUCTOS, payload: productList }; //Guardamos los productos en el estado del Reducer
};

export const addToCart = (id, cantidad, opcion) => {
  if (opcion === 1) {
    cantidad = 1;
  }

  let datos = [id, cantidad];
  console.log("datos: " + id + " " + cantidad);
  return { type: AÑADIR_A_CANASTA, payload: datos };
};
export const delToCart = (id, cantidad, opcion) => {
  if (opcion === 1) {
    ///Clic en Borrar todos
    return { type: BORRAR_TODOS_CANASTA, payload: id };
  } else {
    /// Clic en -1

    return cantidad > 1
      ? { type: BORRAR_UNO_CANASTA, payload: id }
      : { type: BORRAR_TODOS_CANASTA, payload: id };
  }

};

/*export const enviarPedido = () => {
    let O_pedido = {}
    let productos = []
    const pedido = canasta.map((item) =>
        //("-" + item.titulo.replace(" ", "%20")) + `%20(${item.cantidad})`)
        (`Titulo: ${item.titulo} Cantidad ${item.cantidad} precio: ${(item.precio * item.cantidad)}`))
    //let pedidoWhatsapp = pedido.join("%0A")
    //console.log(pedido)
    //window.open(`https://api.whatsapp.com/send?phone=573193896000&text=Hola%20mi%20pedido%20es%3A%0A${pedidoWhatsapp}%0AGracias❤`);
    O_pedido = { Mesa: "5", Productos: pedido }
    console.log("pedido=", O_pedido)
    calcularTotal()
}*/

export const calcularTotal = () => {
  return { type: CALCULAR_TOTAL };
};

export const seleccionarMesa = (id) => {
  return { type: SELECCIONAR_MESA, payload: id};
};
export const buscarProductos = (busqueda) => {
  return { type: BUSCAR_PRODUCTOS, payload: busqueda};
};