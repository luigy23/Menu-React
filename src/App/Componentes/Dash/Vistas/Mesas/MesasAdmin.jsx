import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CrearMesa, traerMesas } from "../../../../Services/ApiMesas";
import { ioSocket } from "../../../../Socket";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IPlus } from "../../../../Assets/Icons/IPlus";
import ItemMesa from "./ItemMesa";
import { ToastContainer, toast } from "react-toastify";

const MesasAdmin = () => {
  const [mesas, setMesas] = useState([]);

  const [nuevaMesa, setNuevaMesa] = useState({
    Descripcion: "",
    Estado: "Disponible",
  });


  const cargarMesas = () => {
    traerMesas().then((mesas) => {
      setMesas(mesas);
      console.log(mesas);
    });
  };

  useEffect(() => {
    ioSocket.on("mesas", traerMesas);
    cargarMesas();

    return () => {
      ioSocket.off("mesas", traerMesas);
    };
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const CrearMesaApi = () => {

    if (nuevaMesa.Descripcion == "") {
      toast.error("Ingrese un nombre");
      return;
    }
    if (nuevaMesa.Estado == "") {
      toast.error("Ingrese un estado");
      return;
    }

    console.log(nuevaMesa);

    toast.promise(CrearMesa(nuevaMesa), {
      pending: "Creando Mesa",
      success: "Mesa Creada",
      error: "Error al crear",
    });


  }

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center p-4">
        <h1 className="text-xl mb-9">Mesas</h1>

        <div className="flex items-center justify-center mb-2">
          <Button
            color="primary"
            variant="solid"
            size="small"
            startContent={<IPlus />}
            onPress={onOpen}
          >
            Añadir Mesa
          </Button>
        </div>

        <div className="flex gap-2 w-full items-center justify-center flex-wrap">
          {mesas.map((mesa, index) => (
            <ItemMesa index={index} mesa={mesa} key={index} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Añadir Mesa
        
              </ModalHeader>
              <ModalBody>

                <div className="flex items-center gap-2">
                  <Input
                  label="Nombre"
                  value={nuevaMesa.Descripcion}
                  onChange={(e) => setNuevaMesa({ ...nuevaMesa, Descripcion: e.target.value })}
                  placeholder="Nombre" />
                  
                </div>


              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => CrearMesaApi()}>
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

export default MesasAdmin;
