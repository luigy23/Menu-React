import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import CrearUsario from './CrearUsuario';
import { useModal } from '../../../../Hooks/useModal';
import Modal from '../../../Modal';
import { traerUsuarios } from '../../../../Services/ApiLogin';

const Usuarios = () => {
    //usuarios de ejemplo
    const [users, setUsers] = useState([]);
    const ObtenerUsuarios = () => {
        traerUsuarios().then((data) => setUsers(data));
    }

    useEffect(() => {
        ObtenerUsuarios();
    }, []);


    //modal
    const [isOpenModal, openModal, closeModal] = useModal(false);

    const onDelete = (id) => {
        console.log(id)
    }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <h1 className="text-2xl font-semibold mb-6">Gestión de Usuarios</h1>

    
    <button className="bg-shamrock-500 px-2 py-1 hover:bg-shamrock-600 rounded-md text-white" onClick={openModal}>
        Crear Usuario 
    </button>
    {
        isOpenModal && 
        <Modal isOpen={isOpenModal} closeModal={closeModal} estilo={"pb-6 p-4 justify-center items-center"}
      >
        <CrearUsario onCreate={onDelete} actualizar={ObtenerUsuarios} />
        </Modal>
  
    }

    <UserList users={users} actualizar={ObtenerUsuarios} />
 

    </div>
  )
}

export default Usuarios