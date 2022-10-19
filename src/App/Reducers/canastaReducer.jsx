import { useEffect, useState } from "react";
import { TYPES } from "../Actions/canastaAction";







export const canastaInicialState = {

  productos: [

  ],




  canasta: [],
  total:0

};
export function canastaReducer(state, action) {


  switch (action.type) {

    case TYPES.CARGAR_PRODUCTOS: {


      return { ...state, productos: action.payload }

    }

    case TYPES.AÑADIR_A_CANASTA: {
      let newItem = state.productos.find(producto => producto.id === action.payload[0])

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

    case TYPES.BORRAR_TODOS_CANASTA: {

      return { ...state, canasta: state.canasta.filter((item) => item.id !== action.payload) }

    }
    case TYPES.BORRAR_UNO_CANASTA: {

      let itemInCanasta = state.canasta.find((item) => item.id === action.payload);

      return {
        ...state, canasta: state.canasta.map((item) =>
          item.id === itemInCanasta.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item),
      }

    }

    case TYPES.BORRAR_CANASTA: {

      return canastaInicialState;



    }
    case TYPES.ENVIAR_PEDIDO: {

      return console.log(state.canasta)
    }
    case TYPES.CALCULAR_TOTAL:{

      let totaliti=0
      state.canasta.forEach(item => {
        totaliti= totaliti + (item.precio*item.cantidad)
      });


      return {...state, total:totaliti}  
    }


    default: return state;

  }

}