import {
  traerCategorias,
  editarCategoria,
  eliminarCategoria,
  agregarCategoria,
} from "../../../../Services/ApiCategorias";
import { useState, useEffect } from "react";
import { FontAwesomeIcon as Icono } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../Modal";
import { useModal } from "../../../../Hooks/useModal";
import { ToastContainer, toast } from "react-toastify";

export const Categorias = () => {
  const [descripcion, setDescripcion] = useState("");
  const [Nombre, setNombre] = useState("");
  const [idCategoria, setIdCategoria] = useState(0);

  const [categorias, setCategorias] = useState([]);
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  useEffect(() => {
    traerCategorias().then((data) => setCategorias(data));
  }, []);

  const clickEditar = (idCategoria, Nombre) => {
    //
    setIdCategoria(idCategoria);
    setNombre(Nombre);

    openModal();
  };
  const guardarCategoria = (idCategoria, Nombre) => {
    console.log("Categoria a enviar:", idCategoria, Nombre);
    toast.promise(editarCategoria(idCategoria, Nombre), {
      pending: "Guardando...",
      success: "Guardado",
      error: "Error al guardar",
    });
  };
  const borrarCategoria = (idCategoria) => {
    console.log("Categoria a borrar:", idCategoria);
    toast.promise(eliminarCategoria(idCategoria), {
      pending: "Eliminando...",
      success: "Eliminado",
      error: {
        render({ data }) {
          return `Error: ${data.response.data}`;
        },
      },
    });
  };
  const crearCategoria = (e,Nombre, Descripcion) => {
    e.preventDefault();
    toast.promise(agregarCategoria(Nombre, Descripcion), {
      pending: "Creando...",
      success: "Creado",
      error: {
        render({ data }) {
          return `Error: ${data.response.data}`;
        },
      },
    });
  };

  return (
    <>
      <div className="container flex flex-col items-center gap-10">
        <button
          className="btn bg-green-400 hover:bg-green-600 text-white"
          onClick={() => openModal2()}
        >
          Crear Categoria
        </button>

        <table className="  table w-full ">
          <thead className="bg-slate-500">
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((item) => (
              <tr key={item.idCategoria}>
                <td className="p-2">{item.Nombre}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="btn bg-yellow-400 hover:bg-yellow-600 text-white "
                    onClick={() => clickEditar(item.idCategoria, item.Nombre)}
                  >
                    <Icono icon={faEdit} />
                  </button>
                  <button
                    className="btn bg-red-400 hover:bg-red-600 text-white "
                    onClick={() => borrarCategoria(item.idCategoria)}
                  >
                    <Icono icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpenModal && (
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
            <label htmlFor="nombreCategoria" className="flex-col flex ">
              <span className="font-semibold  px-3 py-1 rounded-lg ">
                Nombre de la categoria:
              </span>

              <input
                className="border-2 border-gray-300 rounded-lg text-center"
                type="text"
                id="nombreCategoria"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <button
              onClick={() => guardarCategoria(idCategoria, Nombre)}
              className="btn bg-green-400 hover:bg-green-600 text-white bg"
            >
              Guardar
            </button>
          </div>
        </Modal>
      )}

      {isOpenModal2 && (
        <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
          <p>Crear Categoria</p>

          <form onSubmit={(e) => crearCategoria(Nombre, descripcion)}>

          <label htmlFor="nombreCategoria" className="flex-col flex ">
              <span className="font-semibold  px-3 py-1 rounded-lg ">
                Nombre de la categoria:
              </span>
              <input
                
                className="border-2 border-gray-300 rounded-lg text-center"
                type="text"
                id="nombreCategoria"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label htmlFor="descripcionCategoria" className="flex-col flex ">
              <span className="font-semibold  px-3 py-1 rounded-lg ">
                Descripcion de la categoria:
              </span>
              <input
                className="border-2 border-gray-300 rounded-lg text-center"
                type="text"
                id="descripcionCategoria"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </label>
            <button
              type="submit"
              
              className="btn bg-green-400 hover:bg-green-600 text-white bg w-full"
            >
              Guardar
            </button>




          </form>
          <div className="flex flex-col items-center justify-start  gap-2 p-4">

          </div>
        </Modal>
      )}

      <ToastContainer autoClose={1600} />
    </>
  );
};

export default Categorias;
