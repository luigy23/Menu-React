import {combineReducers} from "redux"
import { canastaReducer} from "./canastaReducer.js";
import { pedidosReducer } from "./pedidosReducer.js";

const reducer = combineReducers(
    {
        canasta:canastaReducer,
        pedidos:pedidosReducer
    })
export default reducer;