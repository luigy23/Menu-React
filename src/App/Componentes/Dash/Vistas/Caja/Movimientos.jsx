import React, { useEffect, useState } from 'react'
import { traerMovimientos, traerMovimientosPorFecha } from '../../../../Services/ApiMovimientos'
import "../../../../Estilos/Movimientos.css"
import Movimiento from './Movimiento'
import { ioSocket } from '../../../../Socket'
import Filtros from './Movimientos/Filtros'
import Datepicker from 'react-tailwindcss-datepicker'

const Movimientos = () => {


    const [movimientos, setMovimientos] = useState([])

    const recibirActualización = () => {
        traerMovimientosCaja()
        console.log("actualizado");
    };
    const traerMovimientosCaja = async () => {
        const movimientos = await traerMovimientos()
        setMovimientos(movimientos)
    }

    useEffect(() => {
        traerMovimientosCaja()
        ioSocket.on("actualizarCaja", recibirActualización);
        return () => {
            ioSocket.off("actualizarCaja", recibirActualización);
        };

    }, [])

    const traerMovimientosCajaFecha = async (fecha) => {
        const movimientos = await traerMovimientosPorFecha(fecha)
        setMovimientos(movimientos)
    }

    
    const [fecha, setFecha] = useState({
        startDate: null,
        endDate: null,
    })

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setFecha(newValue); 
        if (newValue.startDate && newValue.endDate) {
            traerMovimientosCajaFecha(newValue)

        } 
    };
        



  return (
    <div className='flex flex-col bg-teal-50 rounded-lg w-full items-center justify-center p-2 gap-3'>
        {/* <Filtros/>
        <span className='flex w-full items-start'>Ultimos Movimientos:</span> */}



        



        <span className='flex w-full items-start'>Movimientos</span>


        <Datepicker 
        primaryColor={"green"} 
        value={fecha} 
        onChange={handleValueChange} 
        popoverDirection='down'
        inputClassName={"bg-slate-50 w-full rounded-lg px-2 py-1 cursor-pointer"} 
        placeholder='Seleccionar fecha'
        separator=' hasta'
        showShortcuts={true}
        configs={{
            shortcuts: {
            today: "Hoy", 
            yesterday: "Ayer", 
            past: period => `Ult. ${period} días`, 
            currentMonth: "Este Mes", 
            pastMonth: "Mes Pasado",
            }}}
        
        
        />

        <div className='flex flex-col gap-2 w-full h-96 overflow-y-scroll scrollbar'>
        {   movimientos.length > 0 &&
            movimientos.map((movimiento) => {
                return (
                    <Movimiento movimiento={movimiento} />
                )
            })
        }
        </div>


    </div>
  )
}

export default Movimientos