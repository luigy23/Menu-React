import axios from 'axios';
const api = process.env.REACT_APP_API;

export const traerMovimientos = async () => {
    const res = await axios(api + '/movimientos');
    const movimientos = res.data;
    return movimientos;
    }
// pasamos las fechas por el body
export const traerMovimientosPorFecha = async (fecha) => {

    const body = {
        fechaInicio: fecha.startDate,
        fechaFin: fecha.endDate
    }

    const res = await axios.post(api + '/movimientos/filtrados', body);
    const movimientos = res.data;
    return movimientos;
}
    
    
