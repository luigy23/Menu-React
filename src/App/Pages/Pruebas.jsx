import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Usuario from '../Componentes/Usuario/Usuario'
const Pruebas = () => {


const iniciarSesion = async (usuario,pass) => {
    const res = await axios.post('http://localhost:4000/login', {
        usuario: "luigy23",
        contraseña: "Luigy23."
    })
    const token = res.data.token
    Cookies.set('token', token) //expires es el tiempo de vida de la cookie en dias, si quieres 
    console.log(res.data.message);

}

const iniciarCaja = async () => {

    const res = await axios.post('http://localhost:4000/caja', {
        saldoInicial: 5000
    }, {
        withCredentials: true,

    })

    console.log(res.data);

}

const cerrarSesion = () => {
    Cookies.remove('token')
}

  return (
    <div className='w-full h-screen gap-3 flex-col bg-smoke-800 text-white flex items-center justify-center'>
        <h1>Hola</h1>
        <button 
        onClick={iniciarSesion}
        className='bg-scooter-500 hover:bg-scooter-600 text-white font-bold py-2 px-4 rounded'
        >Iniciar Sesion
        </button>
        <button
        onClick={iniciarCaja}
        className='bg-scooter-500 hover:bg-scooter-600 text-white font-bold py-2 px-4 rounded'
        >Iniciar Caja
        </button>
        <button
        onClick={cerrarSesion}
        className='bg-scooter-500 hover:bg-scooter-600 text-white font-bold py-2 px-4 rounded'
        >Cerrar Sesion
        </button>
        <Usuario/>




    </div>
  )
}

export default Pruebas