import { configureStore } from "@reduxjs/toolkit"
import { createStore } from "@reduxjs/toolkit";
import reducer from "../Reducers"

const store =  createStore(reducer);
store.subscribe(()=>console.log(store));
export default store;