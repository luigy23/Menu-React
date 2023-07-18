import { useState } from 'react';
import { traerProductosMesa } from '../Services/ApiMesas';



export default function useFactura() {
  const [cargando, setCargando] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState(null);

  const cargarPedido = async (mesa) => {
    setCargando(true);
    try {
      const resultado = await traerProductosMesa(mesa);
      setPedido(resultado);
      setMesa(mesa);
    } catch (error) {
      console.log(error);
      setPedido([]);
    }
    setCargando(false);
  }

  const calcularTotal = () => {
    // calcular total 
  }

  // otras funciones útiles

  return {
    cargando,
    pedido,
    mesa,
    cargarPedido,
    calcularTotal
  }

}