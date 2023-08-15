import React from 'react'
import { eliminarUsuario } from '../../../../Services/ApiLogin';
import { toast, ToastContainer } from 'react-toastify';
import { useModal } from '../../../../Hooks/useModal';
import Modal from '../../../Modal';
import ActualizarUsuario from './ActualizarUsuario';
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const UsuarioItem = ({user, actualizar}) => {

    const [isOpenModal, openModal, closeModal] = useModal(false);

    const handleDelete = (usuario) => {

        toast(
            (<div className='flex flex-col gap-2'>
                <span>¿Estas seguro que deseas eliminar a {usuario}?</span>
                <button className='bg-shamrock-500 px-2 py-1 hover:bg-shamrock-600 rounded-md text-white' onClick={() => {
                    eliminarUsuario(usuario).then((res) => {
                        alert(res);
                        actualizar();


                    });
                    toast.dismiss();
                }}>Eliminar</button>
                <button className='bg-shamrock-500 px-2 py-1 hover:bg-shamrock-600 rounded-md text-white' onClick={() => toast.dismiss()}>Cancelar</button>
            </div>), {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }
        )
    }


    return (
        <>
        <li key={user.Usuario} className="p-4 rounded-lg shadow-sm bg-slate-50 mb-2">
            <div className="flex items-center justify-between">
                <div className='flex gap-2'>
                    <span className="font-semibold ">{user.Nombres} {user.Apellidos} </span>
                    <span className='etiqueta bg-shamrock-300'>{user.Usuario}</span>
                    <span className='etiqueta bg-scooter-300'>{user.cargo}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        className="btn bg-yellow-400 hover:bg-yellow-600 text-white "
                        onClick={openModal}
                    >
                        <Icono icon={faEdit} />
                    </button>
                    <button
                        className="bg-red-500 px-2 py-1 hover:bg-red-600 rounded-md text-white"
                        onClick={() => handleDelete(user.Usuario)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>

        </li>

        {
                isOpenModal &&
                <Modal isOpen={isOpenModal} closeModal={closeModal} estilo={"pb-6 p-4 justify-center items-center"}
                >
                    <ActualizarUsuario actualizar={actualizar} usuario={user.Usuario} />
                </Modal>
            }
        <ToastContainer /></>
    )
}

export default UsuarioItem