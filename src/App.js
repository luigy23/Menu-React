import {  Route, Routes, useNavigate } from "react-router-dom";

import "./App.scss";

// Pages
import Menu from "./App/Pages/Menu.jsx";
import { Mesas } from "./App/Pages/Mesas";
import Admin from "./App/Pages/Admin";
// Actions
import { cargadeProductos } from "./App/Actions/canastaActions";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//otross
import { ioSocket } from "./App/Socket";
import Pedidos from "./App/Componentes/Dash/Vistas/Pedidos";
import { Productos } from "./App/Componentes/Dash/Vistas/Productos/Productos";
import { traerProductos } from "./App/Services/ApiProductos";
import { Categorias } from "./App/Componentes/Dash/Vistas/Categorias/Categorias";
import MetodosPagoAdmin from "./App/Componentes/Dash/Vistas/MetodosPago/CrudMetodosPago";
import Caja from "./App/Componentes/Dash/Vistas/Caja/Caja";
import Cuenta from "./App/Pages/Cuenta";
import Pruebas from "./App/Pages/Pruebas";
import axios from "axios";


//login
import Login from "./App/Pages/Login";
import { loginSuccess, logout } from "./App/Reducers/usuarioReducer";
import RequireAuth from "./App/Login/RequiredAuth";
import Usuarios from "./App/Componentes/Dash/Vistas/Usuarios/Usuarios";
import Configuracion from "./App/Pages/Configuracion";
import MesasAdmin from "./App/Componentes/Dash/Vistas/Mesas/MesasAdmin.jsx";
import { NextUIProvider } from '@nextui-org/system';

function App() {
  const dispatch = useDispatch();
  



  //cargo los productos en el estado global
  const cargarProductos = () =>{
    traerProductos().then(
      (data)=>    { console.log("return de la api: ", data)
      dispatch(cargadeProductos(data))}
    )

    
    //setCargado(!cargado)
    }
  
    //recibe la actualizacion de productos en caso de que se modifique alguno
  const recibirActualización = () =>{
    cargarProductos()
    console.log("Productos Actualizados")
    
  }
  
  const verificarLogueo = async () => {
    //verifico si el usuario esta logueado en el servidor
    const res = await axios.get(`${process.env.REACT_APP_API}/login/verificar`)
    console.log("respuesta", res.data)
    //si el usuario esta logueado, guardo el usuario en el estado global
    if (res.data.message === "ok") {
        //guardar el usuario en el estado global
        dispatch(loginSuccess(res.data))
        console.log("logueado")
        
    } else {
        dispatch(logout())
        console.log("no logueado")
    }
}



  useEffect(() => {
    //request a la api
    ioSocket.on("connect", () => {
      console.log("connected to server importado");
    });
    ioSocket.on("connect_error", (err) => {
      console.log("error de conexion importado ", err);
    });
    ioSocket.on("productos",recibirActualización);

    verificarLogueo()

    cargarProductos()
 
    return () => {
      ioSocket.off("productos", recibirActualización);
    };
      
    //dispatch(cargadeProductos(productList));
  }, []);


  return (
    <>
     
      <NextUIProvider  navigate={ useNavigate()}>
        <div id="principal">
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Mesas></Mesas>
            </RequireAuth>  
          } />
          
          <Route path="/Menu" element={
            <RequireAuth>
               <Menu/>
            </RequireAuth>
          } />
          
          <Route path="/Cuenta" element={
            <RequireAuth>
              <Cuenta/>
            </RequireAuth>  
          } />
          
          <Route path="/admin" element={
            <RequireAuth>
              <Admin />
            </RequireAuth>}>
            
            <Route path="pedidos" element={
              <RequireAuth>
                <Pedidos />
              </RequireAuth>  
            } />
            
            <Route index element={
              <RequireAuth>
                <Caja/>  
              </RequireAuth>
            } />
            
            <Route path="productos" element={
              <RequireAuth>
                <Productos />
              </RequireAuth>
            } />
            
            <Route path="categorias" element={
              <RequireAuth>
                <Categorias/>
              </RequireAuth>  
            } />
            
            <Route path="metodosPago" element={
              <RequireAuth>
                <MetodosPagoAdmin/>
              </RequireAuth>
            } />

            <Route path="usuarios" element={
              <RequireAuth>
                <Usuarios/>
              </RequireAuth>
            } />

            <Route path="mesas" element={
              <RequireAuth>
                <MesasAdmin/>
              </RequireAuth>
            } />

            
          </Route>
          
          <Route path="/pruebas" element={<Pruebas/>} />
          
          <Route path="/pedidos" element={<Admin />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/config" element={<Configuracion/>} />
          
        </Routes>
        </div>
        </NextUIProvider>
      
    </>
  );
}

export default App;

