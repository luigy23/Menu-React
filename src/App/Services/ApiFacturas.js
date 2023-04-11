// Description: Servicio para consumir la API de facturas
import axios from 'axios';
const api = process.env.REACT_APP_API;

export const traerFacturas = async () => {
    const res = await axios(api + '/facturas');
    const facturas = res.data;
    return facturas;
    }


    // enviar una peticion post a la api con un body que contenga { idCaja, mesa, idMetodoPago, idUsuario, recibido, descuento }:
    export const crearFactura = async (factura) => {
    console.log(factura)
    const res = await axios.post(api + '/facturas', factura);
    const facturaCreada = res.data;
    return facturaCreada;
    }
