import React from 'react'
import MenuNav from '../Componentes/MenuNav'
import { testImpresora } from '../Services/ApiCaja'
import ChatBot from '../Componentes/Chat/ChatBot'

const Configuracion = () => {
  const handleTest = async () => {
    const respuesta = await testImpresora();

    alert(respuesta)
    console.log(respuesta)
  }
  return (

    <>
    <MenuNav/>
    <main className="flex flex-col  p-4 items-center">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <button onClick={handleTest

        } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Probar Impresoras</button>

    </main>
    </>
  )
}

export default Configuracion


// router.get('/test', async (req, res) => {
//   try {
//    imprimirPrueba()
//   res.json("Test")
//   }
//   catch (error) {
//     console.error("Error en test: ", error)
//     res.json("Error en test")
//   }


  
//   })