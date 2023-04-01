import React from 'react'
import IconCashCoin from '../../../../Assets/Icons/ICaja'
import IconTicketOutline from '../../../../Assets/Icons/ITicket'
const Caja = () => {
  return (
    <div className='gap-10 flex flex-col h-full p-4 bg-slate-100'>
      <h1>Caja</h1>
    <div className='grid grid-cols-8  gap-3'>
      
      <div className='tarjeta_Caja flex justify-center items-center shadow-md rounded-lg
       bg-white p-2 gap-10 
      col-start-2
      col-span-3'>
        <IconCashCoin className='w-10 h-10 text-shamrock-600' />
        <div className='flex flex-col items-start'>
           <h2 className='font-normal text-rhino-300'>Saldo Disponible:</h2>
           <span className='font-medium '> $ 246.00</span>
           </div>
       
      </div>
      <div className='tarjeta_Caja flex 
      justify-center items-center shadow-md 
      rounded-lg bg-shamrock-400 text-white p-2
      gap-2
      col-span-2
      cursor-pointer
      hover:bg-shamrock-500
      transition-all
      ease-in-out
      '>
        <IconTicketOutline className='w-10 h-10' />
        <div className='flex flex-col items-start'>
            <h2 className='font-semibold'>Nueva Factura</h2>
        </div>
      </div>



    </div>
</div>
  )
}

export default Caja