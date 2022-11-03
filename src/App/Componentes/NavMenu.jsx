import React from 'react'
import "../Estilos/NavMenu.scss"
import { useState } from 'react'
import Modal from './Modal'
import { useModal } from '../Hooks/useModal'
import Producto from './Producto'
import Buscador from './Buscador'



const NavMenu = ({ productos, addToCart }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [filtro, setFiltro] = useState([]) //Array de productos que coincide con la busqueda
  const [texto, setTexto] = useState("") //texto de busqueda que se escribe en el buscador




  const mostrar = () => {
    console.log("ejecutando mostrar")
    let busqueda = productos.filter((producto) => producto.titulo.toUpperCase().includes(texto.toUpperCase()))
    setFiltro(busqueda)
    openModal()
    console.log(filtro.length)


  }

  return (
    <>
      <div className='navMenu'>
        <div className='BuscarContenedor'>
          <Buscador setTexto={(txt) => setTexto(txt)} evento={() => mostrar()}></Buscador>
        </div>
      </div>

      <Modal isOpen={isOpenModal} estilo={"busqueda"} closeModal={closeModal}>

        {
          filtro.length>0 ? filtro.map((producto) => <Producto key={producto.id} data={producto} add_to_cart={addToCart} />):<h3>No se encuentra</h3>
        }

      </Modal>
    </>
  )
}

export default NavMenu