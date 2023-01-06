import { CARGAR_PEDIDOS } from "../Types/pedidoTypes";

export const inicialState = {

    pedidos:[]

}
export function pedidosReducer (state= inicialState, action){
switch (action.type) {
    case CARGAR_PEDIDOS: {
        return {...state, pedidos: action.payload};
    }
    


    default:
        return state;
}}