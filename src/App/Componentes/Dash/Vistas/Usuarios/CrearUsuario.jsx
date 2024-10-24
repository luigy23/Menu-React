import React, { useState } from 'react';

import { registrarUsuario } from '../../../../Services/ApiLogin';


import { toast, ToastContainer } from 'react-toastify';


//importamos zod para validar los datos

const CrearUsario = ({ actualizar }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [userName, setUserName] = useState('')
    const [cargo, setCargo] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [password, setPassword] = useState('')

        ;



    const limpiarFormulario = () => {
        setNombre('');
        setApellido('');
        setUserName('');
        setCargo('');
        setFechaNacimiento('');
        setPassword('');
    }
    const handleCreate = () => {
        // Validar datos
        if (nombre.trim() === '' || apellido.trim() === '' || userName.trim() === '' || cargo.trim() === '' || fechaNacimiento.trim() === '' || password.trim() === '') {
            toast.error('Todos los campos son obligatorios');
            return;
        }
    
        // Crear objeto usuario
        const usuario = {
            nombre,
            apellido,
            usuario: userName,
            cargo,
            fechaNacimiento,
            contraseña: password
        };
    
        console.log(usuario);
    
        // Enviar el objeto
        registrarUsuario(usuario)
            .then(res => {
                if (res.status === 201) {  // Verifica si el registro fue exitoso
                    toast.success(res.data.message);  // Mensaje de éxito desde el back
                    limpiarFormulario();
                    actualizar();
                } 
                    
                 
            
            })
            .catch(err => {
                console.log(err);
    
                // Verificar si el error tiene una respuesta del servidor con detalles
                if (err.response) {
                    const { data } = err.response;
    
                    // Si el error es de validación y tiene errores detallados
                    if (data.errores && Array.isArray(data.errores)) {
                        data.errores.forEach(error => {
                            toast.error(`${error.campo}: ${error.mensaje}`);
                        });
                    } else if (data.message) {
                        // Si hay un mensaje general de error
                        toast.error(data.message);
                    } else {
                        toast.error('Error desconocido. Intente de nuevo más tarde.');
                    }
                } else {
                    toast.error('Error de conexión. Verifique su red.');
                }
            });
    };
    
    return (
        <div className="max-w-md mx-auto  flex flex-col gap-2 ">
            <h2 className="text-xl font-semibold mb-4 ">Crear Usuario</h2>
            <div className="flex space-x-2 ">
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Nombre
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="border rounded-md p-2 w-full"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    /></label>
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Apellido
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="border rounded-md p-2 w-full"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </label>
            </div>
            <div className="flex space-x-2 ">
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Cargo

                    <select
                        id="role"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        <option value={1}>Administrador</option>
                        <option value={2}>Cajero</option>
                        <option value={3}>Mesero</option>
                        
                    </select>


                </label>
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Fecha de nacimiento
                    <input
                        type="date"
                        placeholder="Fecha de nacimiento"
                        className="border rounded-md p-2 w-full"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </label>
            </div>
            <div className="flex space-x-2 ">
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Nombre de usuario
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        className="border rounded-md p-2 w-full"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label className="text-gray-600 w-1/2 flex items-start flex-col">Contraseña
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="border rounded-md p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button
                className="bg-blue-500 w-full mt-2 text-white rounded-md p-2 hover:bg-blue-600"
                onClick={handleCreate}
            >
                Crear
            </button>
            <ToastContainer />
        </div>
    );
};

export default CrearUsario;