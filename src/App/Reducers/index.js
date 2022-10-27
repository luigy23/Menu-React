import {combineReducers} from "redux"
import { canastaReducer } from "./canastaReducer.js";

const reducer = combineReducers({canasta:canastaReducer})
export default reducer;