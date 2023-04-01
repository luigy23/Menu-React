import {
  AÑADIR_A_CANASTA,
  BORRAR_TODOS_CANASTA,
  BORRAR_UNO_CANASTA,
  BUSCAR_PRODUCTOS,
  CALCULAR_TOTAL,
  CARGAR_PRODUCTOS,
  SELECCIONAR_MESA,
  VACIAR_CANASTA,
} from "../Types";

export const cargadeProductos = (listaProductos) => {
  console.log("Lista de prodcutos:",listaProductos)
  return { type: CARGAR_PRODUCTOS, payload: listaProductos }; //Guardamos los productos en el estado del Reducer
};

export const addToCart = (idProducto, cantidadProducto, opcionAñadir, comentario) => {
  if (opcionAñadir === 1) {
    cantidadProducto = 1;
  }

  // Crea un array con el ID del producto y la cantidad a añadir a la canasta
  const datos = [idProducto, cantidadProducto, comentario];

  // Devuelve una acción con el tipo AÑADIR_A_CANASTA y el array de datos como payload
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

export const seleccionarMesa = (mesa) => {
  return { type: SELECCIONAR_MESA, payload: mesa };
};
export const buscarProductos = (busqueda) => {
  return { type: BUSCAR_PRODUCTOS, payload: busqueda };
};

export const actualizarCanasta = (canasta) => {
  return { type: "ACTUALIZAR_CANASTA", payload: canasta };
  
};
export const vaciarCanasta = () => {
  return { type: VACIAR_CANASTA };
};
