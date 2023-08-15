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
    const usuarioLogueado = res.data.usuario
    //guardamos el usuario en el localstorage:
    localStorage.setItem('usuario', JSON.stringify(usuarioLogueado))



    //controlamos posibles errores:

    //la cookie dura 1 dia:
    Cookies.set('token', token, { expires: 1, sameSite: 'none', secure: true
     })
    console.log(res.data);
    return res.data.message
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message
    }

}

export const cerrarSesion = () => {
    Cookies.remove('token')
    localStorage.removeItem('usuario')
}
export const registrarUsuario = async (usuario) =>{
    try {
      const response = await axios.post(`${api}/registrar`, usuario);  // Reemplaza '/ruta-de-registro' con la ruta real de tu backend
      return response.data.message;  // Devuelve el mensaje de éxito desde la respuesta del servidor
    } catch (error) {
      if (error.response) {
        // Error con respuesta del servidor (código de estado diferente de 2xx)
        if (error.response.status === 409) {
          return 'El usuario ya existe';
        } else {
          return 'Error en el servidor';
        }
      } else if (error.request) {
        // Error en la solicitud sin respuesta del servidor
        return 'No se pudo comunicar con el servidor';
      } else {
        // Otros errores
        return 'Error desconocido';
      }
    }
  }

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