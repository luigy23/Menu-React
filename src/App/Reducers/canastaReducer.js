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
  ACTUALIZAR_CANASTA,
  VACIAR_CANASTA,
  UPDATE_ITEM_COMMENT,
} from "../Types";

export const inicialState = {
  productos: [],
  canasta: [],
  total: 0,
  mesa: {idMesa:0, Estado:""},
  filtro: [],
};
export function canastaReducer(state = inicialState, action) {
  switch (action.type) {
    case CARGAR_PRODUCTOS: {
      console.log("Productos en el reducer")
      return { ...state, productos: action.payload };
      
    }
    case AÑADIR_A_CANASTA: {
      const [codProducto, Cantidad, comentario, idCategoria] = action.payload;
      const producto = state.productos.find((producto) => producto.codProducto === codProducto);
      const productoEnCanasta = state.canasta.find(
      (item) => item.codProducto === producto.codProducto
      );

      return productoEnCanasta
      ? // Si el producto ya está en la canasta, actualiza la Cantidad
        {
        ...state, // Crea una copia del estado actual
        canasta: state.canasta.map( // Crea una copia del array canasta
          (item) => 
          item.codProducto === producto.codProducto // Si el ID del producto coincide con el ID del item en la canasta
            ? { ...item, Cantidad: item.Cantidad + Cantidad, comentario:(item.comentario? item.comentario+`\n ${comentario}`:comentario), idCategoria } // Crea una copia del item y actualiza la Cantidad y idCategoria
            : item // Si no coincide, devuelve el item sin cambios
        ),
        }
      : // Si el producto no está en la canasta, añádelo
        {
        ...state, // Crea una copia del estado actual
        canasta: [
          ...state.canasta, // Crea una copia del array canasta
          { ...producto, Cantidad:Cantidad, comentario, idCategoria }, // Añade un nuevo elemento a la canasta con la copia del producto, la Cantidad proporcionada y idCategoria
        ],
        };
    }
    case BORRAR_TODOS_CANASTA: {
      return {
        ...state,
        canasta: state.canasta.filter((producto) => producto.codProducto !== action.payload),
      };
    }
    case BORRAR_UNO_CANASTA: {
      let itemInCanasta = state.canasta.find(
        (producto) => producto.codProducto === action.payload
      );

      return {
        ...state,
        canasta: state.canasta.map((item) =>
          item.codProducto === itemInCanasta.codProducto
            ? { ...item, Cantidad: item.Cantidad - 1 }
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
      state.canasta.forEach((producto) => {
        totaliti = totaliti + producto.Precio * producto.Cantidad;
      });

      return { ...state, total: totaliti };
    }
    case SELECCIONAR_MESA: {
      return { ...state, mesa: action.payload };
    }
    case BUSCAR_PRODUCTOS: {
      let texto = action.payload;
      console.log("Texto a buscar:", texto);
      let busqueda = state.productos.filter((producto) =>
        producto.Nombre.toUpperCase().includes(texto.toUpperCase())
      );
      console.log("Resultado de la busqueda:", busqueda);

      return { ...state, filtro: busqueda };
    }
    case ACTUALIZAR_CANASTA: {
      let totaliti = 0;
      state.canasta.forEach((producto) => {
        totaliti = totaliti + producto.Precio * producto.Cantidad;
        console.log("Este prodcuto se suma:",producto);
      });
      return { ...state, canasta: action.payload, total: totaliti };
    }
    case "VACIAR_CANASTA": {
      return { ...state, canasta: [] };
    }
    case "UPDATE_ITEM_COMMENT": {
      return {
        ...state,
        canasta: state.canasta.map(item => 
          item.codProducto === action.payload.codProducto
            ? { ...item, comentario: action.payload.comentario }
            : item
        )
      }
    }

    default:
      return state;
  }
}
