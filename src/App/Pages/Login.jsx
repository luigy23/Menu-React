import React, { useState } from 'react'
import { iniciarSesion } from '../Services/ApiLogin'
import Cookies from 'js-cookie'


const Login = () => {
    const [usuario, setUsuario] = useState({
        usuario: '',
        password: ''
    })

    const [error, setError] = useState(false)
    const [sesion, setSesion] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const respuesta = await iniciarSesion(usuario.usuario, usuario.password)

        if (respuesta !== 'Sesion iniciada') {
            setError(respuesta)
        }else{
            setError(false)
            setSesion(true)
            //redireccionar a la pagina de inicio de la app:
            setTimeout(() => {
                window.location.href = '/'
            }
                , 2000);
                

        }




    }

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })  
    }

    return (
        <main className="flex flex-col items-center justify-center w-full h-screen bg-scooter-800">
            <h1
                className='mb-4 text-4xl font-bold text-center text-white'
            >Login</h1>
            <h2>{Cookies.get('token')}</h2>
            <form
            onSubmit={handleSubmit}
                className="flex flex-col w-1/3 p-10 bg-white rounded-lg shadow-lg text-slate-700 "
            >
                <label htmlFor="usuario">Usuario</label>
                <input onChange={handleChange}
                    className='inputText'
                    type="text" name="usuario" id="usuario" placeholder='Ingrese su usuario'
                    value={usuario.usuario}
                />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange}
                value={usuario.password}
                className='inputText ' type="password" name="password" id="password" placeholder='Ingrese su contraseña' />
                <button
                    className='p-2 mt-4 text-white bg-scooter-500 rounded-lg hover:bg-scooter-600 transition-colors ease-in-out '
                    type="submit">Ingresar</button>
                {/* etiqueta donde salen los errores con un error de ejemplo: */}
                {error && <p className='px-2 mt-4 text-red-500 bg-red-200 rounded-lg'>{error}</p>}
                {/* etiqueta para usuario logueado correctamente */}
                {sesion && <p className='px-2 mt-4 text-green-500 bg-green-200 rounded-lg'>Sesion Iniciada Correctamente</p>}
                

            </form>

        </main>
    )
}

export default Login