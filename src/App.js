import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    //request a la api
    ioSocket.on("connect", () => {
      console.log("connected to server importado");
    });
    ioSocket.on("connect_error", (err) => {
      console.log("error de conexion importado ", err);
    });

    ioSocket.on("productos",recibirActualización);


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
            <Route path="/" element={<>

            <Menu></Menu></>} />
            <Route path="/Mesas" element={<Mesas></Mesas>} >
              </Route>
              <Route path="/Cuenta" element={<Cuenta/>} />
            <Route path="/admin" element={<Admin />}>
              <Route path="pedidos" element={<Pedidos />} />
              <Route  index element={<Caja/>} />
              <Route path="productos" element={<Productos />} />
              <Route path="categorias" element={<Categorias/>} />
              <Route path="metodosPago" element={<MetodosPagoAdmin/>} />
             
              
            </Route>

            <Route path="/pedidos" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
