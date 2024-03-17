import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Input,

} from "@nextui-org/react";
import { es } from "date-fns/locale";
import { IPen } from "../../../../Assets/Icons/IPen";
import { ActualizarMesa } from "../../../../Services/ApiMesas";
import { ToastContainer, toast } from "react-toastify";

const ItemMesa = ({ index, mesa }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [estado, setEstado] = useState(mesa.Estado);
    const [nombre, setNombre] = useState(mesa.Descripcion);
    const [edit, setEdit] = useState(false);

  const estadoColorMap = {
    Disponible: "text-emerald-400",
    Ocupado: "text-red-400",
    "Sin Pagar": "text-yellow-400",
  };
  const color = estadoColorMap[estado];

  const reiniciar = () => {
    setEstado(mesa.Estado);
    setNombre(mesa.Descripcion);
    setEdit(false);
  };

  const actualizarMesaApi = () => {
    const mesaActualizada = {
        idMesa: mesa.idMesa,
        Descripcion: nombre,
        Estado: estado,
    };

    console.log(mesaActualizada);
    
    ActualizarMesa(mesaActualizada).then((res) => {
        toast.success("Mesa Actualizada");
        onOpenChange();
    })
    .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar mesa");
    });


    }




  return (
    <>
      <div
        onClick={onOpen}
        key={index}
        className="shadow-lg bg-slate-50 p-2 text-base hover:scale-105 transition-all ease-in-out hover:translate-y-1 border-shamrock-200 border-2 rounded-lg cursor-pointer"
      >
        <p>{mesa.Descripcion}</p>
        <p className={`px-2 py-1 items-center justify-center ${color}`}>
          {estado}
        </p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}
      onClose={() => {
        reiniciar()
        onOpenChange()

      }}
      > 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Mesa: {mesa.idMesa}
              </ModalHeader>
              <ModalBody>
              
                

            <div className="flex items-center ">
                <p >Estado: 
                </p>
                {
                
                !edit ?

               (<>
                <span className={` ml-2 items-center justify-center ${color}`}>
                    {estado}
                </span>
                <Button
                    className="px-1"
                  color="primary"
                  variant="light"
                  startContent={<IPen />}
                  onClick={() => setEdit(!edit)}
                >
                    Editar
                </Button>
                </>)
                :(
                <select
                    className="ml-2"
                    value={estado}
                    onChange={(e) => {
                    setEstado(e.target.value);
                    setEdit(!edit);
                    
                    }}
                >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupado">Ocupado</option>
                    <option value="Sin Pagar">Sin Pagar</option>
                    <option value="Inactiva">Inactiva</option>
                </select>)

}


            </div>
              
                

                <Input type="text" label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

     
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{
                    reiniciar()
                    onClose()

                }}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => actualizarMesaApi()}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ItemMesa;
