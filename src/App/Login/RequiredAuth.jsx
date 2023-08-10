
import { Navigate } from "react-router";
import axios from "axios";

//importamos lo necesario para el contexto de redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Login from "../Pages/Login";
import { loginSuccess, logout } from "../Reducers/usuarioReducer";
//state

//           const res = await axios.get(`${process.env.REACT_APP_API}/login/verificar`)


const RequireAuth = ({ children}) => {


    const state = useSelector((state) => state); //estado
    const dispatch = useDispatch(); //// Acciones de dispatch para modificar el estado de la canasta
    const {isAuthenticated} = state.usuario; //destructuración del estado


    return ( !isAuthenticated ? <Login/> : children )








    
    };

export default RequireAuth