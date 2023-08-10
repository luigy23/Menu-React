import axios from 'axios';
const api = process.env.REACT_APP_API;

export const inicializarCaja = async (saldo) => {
    //console.log(saldo);
    //console.log(api + '/caja')
    //enviamos un post con las cookies activas:

    const res = await axios.post(api + '/caja',{saldoInicial:saldo});


    
    const caja = res.data;
    //console.log(caja);
    return caja;
    }

export const traerCaja = async () => {
    const res = await axios(api + '/caja');
    const caja = res.data;
    return caja;
    }

