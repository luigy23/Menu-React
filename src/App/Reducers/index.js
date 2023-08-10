import {combineReducers} from "redux"
import { canastaReducer} from "./canastaReducer.js";
import { pedidosReducer } from "./pedidosReducer.js";
import usuarioReducer from "./usuarioReducer.js";

const reducer = combineReducers(
    {
        canasta:canastaReducer,
        pedidos:pedidosReducer,
        usuario:usuarioReducer


    })
export default reducer;