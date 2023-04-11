import axios from 'axios';
const api = process.env.REACT_APP_API;

export const inicializarCaja = async (saldo) => {
    console.log(saldo);
    console.log(api + '/caja')
    const res = await axios.post(api + '/caja',{saldoInicial:saldo});
    const caja = res.data;
    console.log(caja);
    return caja;
    }

