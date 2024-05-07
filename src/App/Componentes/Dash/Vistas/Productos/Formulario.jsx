import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  actualizarProductos,
  crearProducto,
  deleteProducto,
} from "../../../../Services/ApiProductos";
//llamamos la api de categorias
import { traerCategorias } from "../../../../Services/ApiCategorias";

const Formulario = ({ data, nuevo }) => {
  
  const {
    codProducto,
    Nombre,
    Descripcion,
    idCategoria,
    Precio,
    Estado,
    Imagen,
    Stock
  } = data;
  const [categorias, setCategorias] = useState([]);
  const [imagenFile, setImagenFile] = useState(null);

  const [producto, setProducto] = useState({
    codigo: codProducto,
    nombre: Nombre,
    descripcion: Descripcion,
    categoria: idCategoria,
    precio: Precio,
    estado: Estado,
    imagen: Imagen,
    stock: Stock,
  });
  const [imagenPreview, setImagenPreview] = useState(Imagen);



  useEffect(() => {
    traerCategorias().then((data) =>{ 
      setCategorias(data)
      //colocamos la primera categoria si es nuevo
      if (nuevo)
      setProducto({
        ...producto,
        categoria: data[0].idCategoria,
      });

    });

    return () => {
      setCategorias([]);
    };
  }, []);




  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  const changeImage = (e) => {
    try {
      const file = e.target.files[0];
      setImagenFile(file);
      const url = URL.createObjectURL(file);
      setImagenPreview(url);
    } catch (error) {
      console.log("hubo un error en cargar laimagen = ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", imagenFile);
    formData.append("producto", JSON.stringify(producto));
    

    if (nuevo) {
      const response = await toast.promise(crearProducto(formData), {
        pending: "Promise is pending",
        success: "Producto Creado 👌",
        error: {
          render({ data }) {
            return `Error: ${data.response.data}`;
          },
        },
      });
    } else {
      const response = await toast.promise(actualizarProductos(formData), {
        pending: "Promise is pending",
        success: "Producto Actualizado 👌",
        error: {
          render({ data }) {
            return `Error: ${data.response.data}`;
          },
        },
      });
    }

    //actualizarProductos(formData)

    console.log(response);
  };

  const handleDelete = async () => {
    console.log("eliminando");

    await toast.promise(deleteProducto(codProducto), {
      pending: "Promise is pending",
      success: "Producto Eliminado 👌",
      error: {
        render({ data }) {
          return `Error: ${data.response.data}`;
        },
      },
    });
  };

  return (
    <>
      <div className="text-base">
        <ToastContainer autoClose={1600} />
      </div>

      <div className="flex gap-2 w-full justify-center p-2">
        <div className=" text-base ">
          <form onSubmit={handleSubmit} className="flex gap-2 ">
            <div
              id="imagen"
              className="flex flex-col items-start p-2 rounded-lg w-56 h-56 border-2
               border-green-400  
               relative overflow-hidden
               cursor-pointer"
              style={{
                backgroundImage: `url(${imagenPreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <label
                htmlFor="imagenInput"
                className="text-sm font-semibold
              cursor-pointer
              bg-green-400  p-1 rounded-xl "
              >
                Arrastra o da Click para seleccionar imagen:
              </label>

              <input
                id="imagenInput"
                className="inputText   cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                type="file"
                name="imagen"
                placeholder="Imagen"
                onChange={changeImage}
              />
            </div>

            <div id="Principal" className="">
              <div id="segundario" className="flex gap-2">
                {nuevo && (
                  <div id="Codigo" className="flex flex-col items-start">
                    <label className="text-sm font-semibold">Codigo:</label>
                    <input
                      className="inputText"
                      type="text"
                      name="codigo"
                      placeholder="pollo1"
                      value={producto.codProducto}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div id="nombre" className="flex flex-col items-start">
                  <label className="text-sm font-semibold">Nombre:</label>
                  <input
                    className="inputText"
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={producto.nombre}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div id="descrip" className="flex flex-col items-start">
                <label className="text-sm font-semibold">Descripción:</label>
                <textarea
                  className="inputText w-full text-sm"
                  name="descripcion"
                  placeholder="Descripción del producto"
                  value={producto.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div id="precio" className="flex flex-col items-start">
                <label className="text-sm font-semibold" htmlFor="">
                  Precio:
                </label>
                <span className="flex items-center">
                  <span className=" text-emerald-300 p-1 rounded-lg absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <input
                    className="inputText"
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={producto.precio}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div id="stock" className="flex flex-col items-start">
                <label className="text-sm font-semibold" htmlFor="">
                  Stock:
                </label>
                <input
                  className="inputText"
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={producto.stock}
                  onChange={handleChange}
                />
              </div>

              <div id="categoria" className="flex flex-col items-start">
                <label className="text-sm font-semibold" htmlFor="">
                  Categoria: 
                </label>

                <select
                  className="inputText"
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleChange}
                >
                  {
                    /* traemos las categorias */
                    categorias.map((categoria) => (
                      <option
                        key={categoria.idCategoria}
                        value={categoria.idCategoria}
                      >
                        {categoria.Nombre}
                      </option>
                    ))
                  }
                </select>
              </div>
              {!nuevo && (
                <button
                  onClick={handleDelete}
                  className="btn border-2 hover:bg-red-300"
                  type="button"
                >
                  Eliminar
                </button>
              )}
              <button className="btn border-2 hover:bg-lime-300" type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
