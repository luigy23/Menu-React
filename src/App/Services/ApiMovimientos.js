import axios from 'axios';
const api = process.env.REACT_APP_API;

export const traerMovimientos = async () => {
    const res = await axios(api + '/movimientos');
    const movimientos = res.data;
    return movimientos;
    }