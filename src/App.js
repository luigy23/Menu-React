import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";

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
import { SocketProvider } from "./App/Contextos/SocketProvider";

function App() {
  const dispatch = useDispatch();

//Aquí guardamos los productros que llamamos de la pai
  const [cargado, setCargado] = useState(false); //Estado de cuando los productos están cargados
  const state = useSelector((state) => state);

  //socket.io

  const api = process.env.REACT_APP_API;

  useEffect(() => {
    //request a la api
    fetch(api+"/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        //Llamada a metodo para actualizar los productos
        dispatch(cargadeProductos(data));
        //console.log(productList);
        setCargado(true);
      });



    //dispatch(cargadeProductos(productList));
  }, [cargado]);

  return (
    <>
    
      <Router>
     
        <div id="principal">
          <Routes>
          
            <Route path="/" element={<Menu ></Menu>} />
            <Route path="/Mesas" element={<Mesas></Mesas>} />
           
            <Route path="/admin" element={ <Admin /> } />
     
            <Route path="/pedidos" element={<Admin />} />
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
