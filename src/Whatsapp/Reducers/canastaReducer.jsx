import { useEffect, useState } from "react";
import { TYPES } from "../Actions/canastaAction";







export const canastaInicialState = {

  productos: [ 
/*    {
      titulo: "Pollo Frito",
      img: "https://cutt.ly/UXCkzM7",
      id: "pollo1",
      precio: 26000
    },

    {
      titulo: "Hamburguesa XL",
      img: "https://cutt.ly/WXCnRSg",
      id: "hamburguesa34",
      precio: 15000
    }
*/
  ],




  canasta: []

};
export function canastaReducer(state, action) {


  switch (action.type) {

    case TYPES.CARGAR_PRODUCTOS:{
      
      
      return{...state, productos:action.payload}
      
    }

    case TYPES.AÑADIR_A_CANASTA: {
      let newItem = state.productos.find(producto => producto.id === action.payload[0])
      
      let itemInCanasta = state.canasta.find((item)=> item.id=== newItem.id);

      return itemInCanasta ? 
      {...state, 
        canasta:state.canasta.map(
          (item) => item.id === newItem.id ? 
          {...item,cantidad:item.cantidad+action.payload[1]}
          :item ) }

      :{...state, canasta:[...state.canasta,{...newItem,cantidad:action.payload[1]}],}
      
     }

    case TYPES.BORRAR_UNO_CANASTA: {
      
      return {...state,canasta:state.canasta.filter((item)=> item.id !== action.payload )}
      alert("borrarndo")
    }
    
    case TYPES.BORRAR_CANASTA: { 
      
      return canastaInicialState;
     


    }
    case TYPES.ENVIAR_PEDIDO:{

    return console.log(state.canasta)
  }
    
    default: return state;

  }

}