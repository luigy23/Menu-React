import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Menu from "./App/Pages/Menu.jsx";
import { Mesas } from "./App/Pages/Mesas";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargadeProductos } from "./App/Actions/canastaActions";
import axios from "axios";
import BottomMenu from "./App/Componentes/BottomMenu";
import MenuNav from "./App/Componentes/MenuNav";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]); //Aquí guardamos los productros que llamamos de la pai
  const [cargado, setCargado] = useState(false); //Estado de cuando los productos están cargados

  useEffect(() => {
    fetch("http://localhost:4000/productos") //traemos productos de API
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); //Llamada a metodo para actualizar los productos
        console.log(productList);
        setCargado(true);
      });

    dispatch(cargadeProductos(productList));
  }, [cargado]);

  return (
    <>
      <Router>
        <div id="principal">
        <MenuNav />
        <Routes>
          <Route path="/" element={<Menu productList={productList}></Menu>} />
          <Route path="/Mesas" element={<Mesas></Mesas>} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
