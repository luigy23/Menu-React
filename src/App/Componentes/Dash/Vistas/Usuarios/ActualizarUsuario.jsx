import React, { useState, useEffect } from 'react';

import { obtenerUsuario, modificarUsuario } from '../../../../Services/ApiLogin';

import { format } from 'date-fns';

import { toast, ToastContainer } from 'react-toastify';


//importamos zod para validar los datos

const ActualizarUsuario = ({ actualizar, usuario }) => {
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
    const handleUpdate = () => {


        //crear objeto usuario
        const usuario = {
            nombre,
            apellido,
            usuario: userName,
            //cargo en numero
            cargo: parseInt(cargo),
            fechaNacimiento,
            //si la contraseña esta vacia no la envia
            contraseña: password === '' ? undefined : password
        }

        console.log(usuario)
        //enviar el objeto
        modificarUsuario(usuario)
            .then(res => {
                console.log(res)
                toast.success(res)
                if (res === "Usuario actualizado exitosamente") {
                    limpiarFormulario();
                    actualizar();
                }



            }
            )
            .catch(err => {
                console.log(err)
                toast.error(res)
            }
            )



    };


    useEffect(() => {
        obtenerUsuario(usuario)
            .then(res => {
                console.log(res)
                setNombre(res[0].Nombres)
                setApellido(res[0].Apellidos)
                setUserName(res[0].Usuario)
                setCargo(res[0].idCargo)
                const formattedDate = format(new Date(res[0].FechaNacimiento), 'yyyy-MM-dd')
                setFechaNacimiento(formattedDate)
                
            })
            .catch(err => console.log(err))
    }, [])



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
                onClick={handleUpdate}
            >
                Actualizar
            </button>
            <ToastContainer />
        </div>
    );
};

export default ActualizarUsuario;