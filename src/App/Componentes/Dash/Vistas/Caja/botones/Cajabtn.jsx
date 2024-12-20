import React, { useEffect, useState } from "react";
import { inicializarCaja } from "../../../../../Services/ApiCaja";
import IconCashCoin from "../../../../../Assets/Icons/ICaja";
import Modal from "../../../../Modal";
import { useModal } from "../../../../../Hooks/useModal";
import { toast, ToastContainer } from "react-toastify";
import { traerCaja } from "../../../../../Services/ApiCaja";
import { formatPrecio } from "../../../../../Services/formatPrecio";
import { ioSocket } from "../../../../../Socket";




const Cajabtn = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [caja, setCaja] = useState({});


  const recibirActualización = () => {
    cargarCaja();
    console.log("actualizado");
  };

  const iniciarCaja = async (saldo) => {
    const data = await toast.promise(inicializarCaja(saldo), {
        pending: "Iniciando Caja",
        success: "Caja Iniciada",
        error: {
           
            render({ data }) {
                console.log({data});
                return ("Error al iniciar caja");
            },
        },
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saldo = e.target[0].value;
    iniciarCaja(saldo);
    };

    //carga caja
    const cargarCaja = async () => {
        const response = await traerCaja();
        if (response[0].length === 0) {
            openModal();
        }

        setCaja(response[0]);
        console.log(response);
    }

    const handleContexMenu = (e) => {
        e.preventDefault();
        openModal();
    }


    useEffect(() => {
        cargarCaja();

        ioSocket.on("actualizarCaja", recibirActualización);

        return () => {
            ioSocket.off("actualizarCaja", recibirActualización);
        };
        
    }, [])


  return (
    <>
    <div
      onContextMenu={handleContexMenu}
      className="tarjeta_Caja flex justify-center items-center shadow-md rounded-lg
      bg-white p-2 gap-10 
        col-start-2
        col-span-3"
    >
      <IconCashCoin className="w-10 h-10 text-shamrock-600" />
      <div className="flex flex-col items-start">
        <h2 className="font-normal text-rhino-300">Saldo Disponible:</h2>
        {/* <span className="font-medium ">{formatPrecio(caja.Saldo)}</span> */}
        <span className="font-medium ">xxx</span>

      </div>
    </div>
    {
        isOpenModal && (
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-2xl font-semibold">Iniciar Caja</h1>
                    <input type="number" /> 
                    </div>
                    <button className="btn-next" type="submit">Iniciar</button>
               </form>
            </Modal>)
    }
    <ToastContainer />

    </>
  );
};

export default Cajabtn;
