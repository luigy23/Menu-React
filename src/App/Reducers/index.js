import {combineReducers} from "redux"
import { canastaReducer} from "./canastaReducer.js";
import mesaReducer from "./mesaReducer.js"

const reducer = combineReducers(
    {
        canasta:canastaReducer,
        mesa:mesaReducer
    })
export default reducer;