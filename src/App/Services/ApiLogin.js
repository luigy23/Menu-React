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



// const registrarUsuario = async (usuario) => {
//   const { nombre, apellido, usuario, contraseña, fechaNacimiento } = usuario;

//   try {
//     const response = await axios.post('/api/registrar', {
//       nombre,
//       apellido,
//       usuario,
//       contraseña,
//       fechaNacimiento
//     });
    
//     return response.data;

//   } catch (error) {
//     console.error(error);
//     return { message: 'Error al registrar usuario' }; 
//   }
// }

