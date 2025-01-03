import axios from 'axios';
const api = process.env.REACT_APP_API;
import Cookies from 'js-cookie'

export const iniciarSesion = async (usuario,pass) => {

    try {
        const res = await axios.post(`${api}/login`, {
            usuario: usuario,
            contraseña: pass
    })
    const token = res.data.token
    console.log(token);
    const usuarioLogueado = res.data.usuario
    //guardamos el usuario en el localstorage:
    localStorage.setItem('usuario', JSON.stringify(usuarioLogueado))
    localStorage.setItem('token', token)

    const isSecure = window.location.protocol === 'https:'

    Cookies.set('token', token, { expires: 1, secure: isSecure, sameSite:'Lax' })

    
    return res.data.message
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message
    }

}

export const cerrarSesion = () => {
    Cookies.remove('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
}
export const registrarUsuario = async (usuario) => {
      const response = await axios.post(`${api}/registrar`, usuario);  
      return response;  // Devolver toda la respuesta completa para manejarla en el front
   
  };
  
export const traerUsuarios = async () => {
    try {
        const res = await axios.get(`${api}/usuarios/Activo`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}


export const eliminarUsuario = async (usuario) => {
    try {
        const res = await axios.delete(`${api}/usuarios/${usuario}`)
        return res.data.message
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuario = async (usuario) => {
    try {
        const res = await axios.get(`${api}/usuarios/usuario/${usuario}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const modificarUsuario = async (usuario) => {
    try {
        const res = await axios.put(`${api}/usuarios`, usuario)
        return res.data.message
    } catch (error) {
        console.log(error);
    }
}