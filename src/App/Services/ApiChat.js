import axios from 'axios';
const api = process.env.REACT_APP_API;


//enviar mensaje
export const enviarMensaje = async (mensaje) => {
    const res = await axios.post(api + '/chat', {mensaje});
    return res.data;
}

export const obtenerMensajes = async () => {
    const res = await axios.get(api + '/chat');
    console.log("MEnsajes:",res.data);
    return res.data;
}

export const limpiarMensajes = async () => {
    const res = await axios.delete(api + '/chat');
    return res.data;
}