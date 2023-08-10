import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  //Aquí guardamos los productros que llamamos de la pai
  const state = useSelector((state) => state);
  const [productos, setproductos] = useState(false)


  const cargarProductos = () =>{
    traerProductos().then(
      (data)=>    { console.log("return de la api: ", data)
      dispatch(cargadeProductos(data))}
    )

    
    //setCargado(!cargado)
    }
  
  const recibirActualización = () =>{
    cargarProductos()
    console.log("Productos Actualizados")
    
  }
  
  const verificarLogueo = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/login/verificar`)
    console.log("respuesta", res.data)

    if (res.data.message === "ok") {
        dispatch(loginSuccess(res.data.usuario))
        //setLogueado(true)
        console.log("logueado")
        
    } else {
        dispatch(logout())
    //setLogueado(false)
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
      <Router>
        <div id="principal">
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Menu/>
            </RequireAuth>  
          } />
          
          <Route path="/Mesas" element={
            <RequireAuth>
              <Mesas></Mesas>
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
            
          </Route>
          
          <Route path="/pruebas" element={<Pruebas/>} />
          
          <Route path="/pedidos" element={<Admin />} />
          
          <Route path="/login" element={<Login />} />
          
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

