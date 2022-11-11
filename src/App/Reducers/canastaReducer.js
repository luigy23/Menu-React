import { CARGAR_PRODUCTOS,AÑADIR_A_CANASTA, BORRAR_TODOS_CANASTA, BORRAR_UNO_CANASTA, BORRAR_CANASTA, ENVIAR_PEDIDO, CALCULAR_TOTAL, SELECCIONAR_MESA, BUSCAR_PRODUCTOS } from "../Types";




export const inicialState = {

  productos: [],
  canasta: [],
  total: 0, 
  mesa:"No hay Mesa",
  filtro:[]

};
export function canastaReducer(state = inicialState, action) {


  switch (action.type) {

    case CARGAR_PRODUCTOS: {


      return { ...state, productos: action.payload }

    }
    case AÑADIR_A_CANASTA : {
      let newItem = state.productos.find(producto => producto.id === action.payload[0])
      //console.log("new item ", action.payload)
      let itemInCanasta = state.canasta.find((item) => item.id === newItem.id);

      return itemInCanasta ?
        {
          ...state,
          canasta: state.canasta.map(
            (item) => item.id === newItem.id ?
              { ...item, cantidad: item.cantidad + action.payload[1] }
              : item)
        }

        : { ...state, canasta: [...state.canasta, { ...newItem, cantidad: action.payload[1] }], }

    }
    case BORRAR_TODOS_CANASTA : {

      return { ...state, canasta: state.canasta.filter((item) => item.id !== action.payload) }

    }
    case BORRAR_UNO_CANASTA : {

      let itemInCanasta = state.canasta.find((item) => item.id === action.payload);

      return {
        ...state, canasta: state.canasta.map((item) =>
          item.id === itemInCanasta.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item),
      }

    }
    case BORRAR_CANASTA : {

      return inicialState;



    }
    case ENVIAR_PEDIDO : {

      return console.log(state.canasta)
    }
    case CALCULAR_TOTAL : {

      let totaliti = 0
      state.canasta.forEach(item => {
        totaliti = totaliti + (item.precio * item.cantidad)
      });


      return { ...state, total: totaliti }
    }
    case SELECCIONAR_MESA :{
      
       return{...state, mesa: action.payload}
    }
    case BUSCAR_PRODUCTOS:{
      let texto = action.payload
      let busqueda = state.productos.filter((producto) => producto.titulo.toUpperCase().includes(texto.toUpperCase()))
  
      return{...state, filtro: busqueda}

    }


    default: return state;

  }

}