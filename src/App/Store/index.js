import { createStore } from "@reduxjs/toolkit";
import reducer from "../Reducers"

const store =  createStore(reducer);
store.subscribe(()=>null);

export default store;