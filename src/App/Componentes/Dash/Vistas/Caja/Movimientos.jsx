import React, { useEffect, useState } from 'react'
import { traerMovimientos } from '../../../../Services/ApiMovimientos'
import "../../../../Estilos/Movimientos.css"
import Movimiento from './Movimiento'
import { ioSocket } from '../../../../Socket'

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




  return (
    <div className='flex flex-col bg-teal-50 rounded-lg w-1/2 p-2 gap-2'>
        <span className='flex w-full items-start'>Ultimos Movimientos:</span>
        {
            movimientos.map((movimiento) => {
                return (
                    <Movimiento movimiento={movimiento} />
                )
            })
        }


    </div>
  )
}

export default Movimientos