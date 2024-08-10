import axios from "axios";
const api = process.env.REACT_APP_API;


export const obtenerTotalVentas = async (fecha) => {

    const body = {
        fechaInicio: fecha.startDate,
        fechaFin: fecha.endDate
    }
    console.log("body:", body)

    const res = await axios.post(api + "/reportes/ventas", body);
    const totalVentas = res.data;
    return totalVentas;
    }

export const obtenerVentasMeseros = async (fecha) => {
    
        const body = {
            fechaInicio: fecha.startDate,
            fechaFin: fecha.endDate
        }
    
        const res = await axios.post(api + "/reportes/ventasMesero", body);
        const ventasMeseros = res.data;
        return ventasMeseros;
        }