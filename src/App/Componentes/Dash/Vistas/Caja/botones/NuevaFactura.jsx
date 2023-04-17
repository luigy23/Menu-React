import React from 'react'
import { useModal } from '../../../../../Hooks/useModal'
import Modal from '../../../../Modal'
import IconTicketOutline from '../../../../../Assets/Icons/ITicket'
import CrearFactura from '../CrearFactura'



const NuevaFactura = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false);

  return (
    <>
    <div
    onClick={openModal}
    className="tarjeta_Caja flex 
justify-center items-center shadow-md 
rounded-lg bg-shamrock-400 text-white p-2
gap-2
col-span-2
cursor-pointer
hover:bg-shamrock-500
transition-all
ease-in-out
"
  >
    <IconTicketOutline className="w-10 h-10" />
    <div className="flex flex-col items-start">
      <h2 className="font-semibold">Nueva Factura</h2>
    </div>
  </div>
  {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          closeModal={closeModal}
          estilo={"w-4/5 overflow-scroll scrollbar"}
        >
          <CrearFactura/>
        </Modal>
      )}
  
  </>
  )
}

export default NuevaFactura