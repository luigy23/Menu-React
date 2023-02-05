import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="flex gap-2">
      {/* <img src="https://acortar.link/D49R8t" alt="" className="w-1/2" /> */}

      <div className="text-base ">
        <form className="space-y-2 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="flex flex-col items-start">
              <label className="text-sm font-semibold" htmlFor="">
                Codigo:
              </label>
              <input className="inputText" type="text" placeholder="bigmac2" />
            </div>

            <div className="flex flex-col items-start">
              <label className="text-sm font-semibold" htmlFor="">
                Precio:
              </label>
              <span class="flex items-center">
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
                <input className="inputText" type="text" placeholder="30000" />
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-start">
              <label className="text-sm font-semibold" htmlFor="">
                Nombre:
              </label>
              <input className="inputText" type="text" placeholder="Big Mac" />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-sm font-semibold" htmlFor="">
                Descripcion:
              </label>
              <textarea
                className="inputText w-full text-sm text-left"
                type="text"
                placeholder=""
              />
            </div>
            <label
              for="toggle-example"
              class="flex items-center cursor-pointer relative mb-4"
            >
              <input type="checkbox" id="toggle-example" class="sr-only" />
              <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
              <span class="ml-3 text-gray-900 text-sm font-medium">
                Toggle me
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );


    /* <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="bg-white shadow-md  text-base rounded px-8 pt-6 pb-8 mb-4"
    // >
    //   <div className="flex">
    //     <div>
    //       <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         for="username"
    //       >
    //         Codigo del producto
    //       </label>
    //       <input
    //         className="inputText"
    //         type="text"
    //         placeholder="Pollo123"
    //         {...register("codProducto", { required: true })}
    //       />
    //     </div>
    //     <div>
    //       <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         for="username"
    //       >
    //         Nombre
    //       </label>
    //       <input
    //         className="inputText"
    //         type="text"
    //         placeholder="Pollo asado"
    //         {...register("Nombre", { required: true })}
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <label
    //       className="block text-gray-700 text-sm font-bold mb-2"
    //       for="username"
    //     >
    //       Estado
    //     </label>
    //     <select
    //       className="inputSlect"
    //       {...register("Estado", { required: true })}
    //     >
    //       <option value="Disponible">Disponible</option>
    //       <option value="Agotado">Agotado</option>
    //     </select>
    //   </div>
    //   <div>
    //     <label
    //       className="block text-gray-700 text-sm font-bold mb-2"
    //       for="username"
    //     >
    //       Imagen
    //     </label>
    //     <input
    //       className="inputText"
    //       type="url"
    //       placeholder="Imagen"
    //       {...register("Imagen", {})}
    //     />
    //   </div>
    //   <div>
    //     <label
    //       className="block text-gray-700 text-sm font-bold mb-2"
    //       for="username"
    //     >
    //       Descripcion
    //     </label>
    //     <textarea className="inputText" {...register("Descripcion", {})} />
    //   </div>
    //   <div>
    //   <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         for="username"
    //       >
    //         Precio
    //       </label>
    //     <input
    //       type="number"
    //       className="inputText"
    //       placeholder="15000"
    //       {...register("Precio", {})}
    //     />
    //   </div>

    //   <input type="submit" />
    // </form>
  );*/
}
