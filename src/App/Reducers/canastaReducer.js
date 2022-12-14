import {
  CARGAR_PRODUCTOS,
  AÑADIR_A_CANASTA,
  BORRAR_TODOS_CANASTA,
  BORRAR_UNO_CANASTA,
  BORRAR_CANASTA,
  ENVIAR_PEDIDO,
  CALCULAR_TOTAL,
  SELECCIONAR_MESA,
  BUSCAR_PRODUCTOS,
} from "../Types";

export const inicialState = {
  productos: [],
  canasta: [],
  total: 0,
  mesa: "No hay Mesa",
  filtro: [],
};
export function canastaReducer(state = inicialState, action) {
  switch (action.type) {
    case CARGAR_PRODUCTOS: {
      return { ...state, productos: action.payload };
    }
    case AÑADIR_A_CANASTA: {
      const [id, cantidad, comentario] = action.payload;
      const producto = state.productos.find((producto) => producto.id === id);
      const productoEnCanasta = state.canasta.find(
        (item) => item.id === producto.id
      );

      return productoEnCanasta
        ? // Si el producto ya está en la canasta, actualiza la cantidad
          {
            ...state, // Crea una copia del estado actual
            canasta: state.canasta.map( // Crea una copia del array canasta
              (item) => 
                item.id === producto.id // Si el ID del producto coincide con el ID del item en la canasta
                  ? { ...item, cantidad: item.cantidad + cantidad, comentario } // Crea una copia del item y actualiza la cantidad
                  : item // Si no coincide, devuelve el item sin cambios
            ),
          }
        : // Si el producto no está en la canasta, añádelo
          {
            ...state, // Crea una copia del estado actual
            canasta: [
              ...state.canasta, // Crea una copia del array canasta
              { ...producto, cantidad:cantidad, comentario }, // Añade un nuevo elemento a la canasta con la copia del producto y la cantidad proporcionada
            ],
          };
    }
    case BORRAR_TODOS_CANASTA: {
      return {
        ...state,
        canasta: state.canasta.filter((item) => item.id !== action.payload),
      };
    }
    case BORRAR_UNO_CANASTA: {
      let itemInCanasta = state.canasta.find(
        (item) => item.id === action.payload
      );

      return {
        ...state,
        canasta: state.canasta.map((item) =>
          item.id === itemInCanasta.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        ),
      };
    }
    case BORRAR_CANASTA: {
      return inicialState;
    }
    case ENVIAR_PEDIDO: {
      return console.log(state.canasta);
    }
    case CALCULAR_TOTAL: {
      let totaliti = 0;
      state.canasta.forEach((item) => {
        totaliti = totaliti + item.precio * item.cantidad;
      });

      return { ...state, total: totaliti };
    }
    case SELECCIONAR_MESA: {
      return { ...state, mesa: action.payload };
    }
    case BUSCAR_PRODUCTOS: {
      let texto = action.payload;
      let busqueda = state.productos.filter((producto) =>
        producto.titulo.toUpperCase().includes(texto.toUpperCase())
      );

      return { ...state, filtro: busqueda };
    }

    default:
      return state;
  }
}
