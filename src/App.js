import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Menu from "./App/Pages/Menu.jsx";
import { Mesas } from "./App/Pages/Mesas";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargadeProductos } from "./App/Actions/canastaActions";
import Admin from "./App/Pages/Admin";
import { io } from "socket.io-client";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]); //Aquí guardamos los productros que llamamos de la pai
  const [cargado, setCargado] = useState(false); //Estado de cuando los productos están cargados

  //socket.io
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState(null);


  useEffect(() => {
     //Conectarse al servidor Socket
    const socket = io('http://localhost:3636' );
    setSocket(socket);
    socket.on('connect', () => {
      console.log('connected to server');
    });



 
    fetch("http://localhost:3636/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); //Llamada a metodo para actualizar los productos
        //console.log(productList);
        setCargado(true);
      });

    dispatch(cargadeProductos(productList));
  }, [cargado]);

  return (
    <>
      <Router>
        <div id="principal">
        
        <Routes>
          <Route path="/" element={<Menu productList={productList}></Menu>} />
          <Route path="/Mesas" element={<Mesas></Mesas>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/pedidos" element = {<Admin/>}/>
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
