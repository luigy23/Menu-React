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

export const addToCart = (idProducto, cantidadProducto, opcionAñadir, comentario, idCategoria) => {
  if (opcionAñadir === 1) {
    cantidadProducto = 1;
    comentario = "";
   
  }

  // Crea un array con el ID del producto y la cantidad a añadir a la canasta
  const datos = [idProducto, cantidadProducto, comentario, idCategoria];

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
