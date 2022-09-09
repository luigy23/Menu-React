import React from 'react'
import "../Estilos/NavMenu.css"
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from './Modal'
import { useModal } from '../Hooks/useModal'
import Producto from './Producto'



const NavMenu = ({productos,addToCart}) => {
  const [visible,setVisible] = useState("Visible");
  const [isOpenModal,openModal,closeModal] = useModal(false);
  const [filtro, setFiltro] = useState([])

  let busqueda = []
  let texto = "";
  

  const enter = (e)=>{
    if (e.key==="Enter"){
      mostrar();
    }
  }


  const mostrar = ()=>{
    busqueda = productos.filter((producto)=> producto.titulo.toUpperCase().includes(texto.toUpperCase()))
    
    console.log(busqueda)
    setFiltro(busqueda)
    openModal()
    

    return(          busqueda.map((producto) =>
    <Producto key={producto.id} data={producto} add_to_cart={addToCart} />
  ))
    
    //visible=="noVisible"?setVisible(null):setVisible("noVisible")
    
  }

  return (
    <>
    <div className='navMenu'>
      <div className='BuscarContenedor'>
      <input onChange ={(e)=>{texto= e.target.value}} onKeyDown={(e)=>enter(e)} className={`Buscar ${visible}`} type="text" placeholder="Hamburguesa">
      </input>
      <button className='btnItem' style={{color:"#fff"}}><Icono onClick={mostrar} icon={faSearch}></Icono></button>
      </div>

    </div>

    <Modal isOpen={isOpenModal} closeModal={closeModal}>
    
    {
       filtro.map((producto) =>
       <Producto key={producto.id} data={producto} add_to_cart={addToCart} />
     )
}

    </Modal>
    </>
  )
}

export default NavMenu