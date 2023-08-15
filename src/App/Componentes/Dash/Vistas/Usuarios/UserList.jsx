


import React, { useState } from 'react';

import UsuarioItem from './UsuarioItem';

const UserList = ({ users, actualizar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter((user) =>
        user.Nombres.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
            <div className="max-w-xl mx-auto mt-6">
                <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar usuario"
                        className="border rounded-md p-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <ul className="">
                    {filteredUsers.map((user) => (
                        <UsuarioItem user={user} actualizar={actualizar} />
                    ))}
                </ul>


            </div>
            

        </>
    );
};

export default UserList;
