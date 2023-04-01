import React from 'react'

const oldMenu = () => {
  return (
    <>
<MenuNav />
<Modal estilo={"max-w-xs"} isOpen={isOpenModal} closeModal={closeModal}>
  <input //Mesero
    type="text"
    value={mesero}
    placeholder="mesero"
    onChange={(event) => setMesero(event.target.value)} // Función para actualizar el valor del input cuando el usuario escriba
  />

  <p className="texto-confirmar">Este es tu pedido:</p>
  <ul className="lista-confirmar">
    {canasta.map((producto, index) => (
      //<li key={index}>{producto.titulo} x{producto.cantidad}</li>
      <ItemCanasta key={index} data={producto} index={index} />
    ))}
  </ul>
  <p className="texto-confirmar">Mesa: {mesa.idMesa}</p>
  <button onClick={() => clickEnviarPedido()} className="btn-confimar">
    confirmar Pedido
  </button>
</Modal>
<div className="page-menu ">
  <Buscador
    evento={() => buscar()}
    setTexto={(texto) => setTextoBusqueda(texto)}
  />
  <div className="contenedor-productos ">
    {textoBusqueda.length == ""
      ? productos.map((producto) => (
          <Producto key={producto.codProducto} producto={producto} />
        ))
      : filtro.map((producto) => (
          <Producto key={producto.codProducto} producto={producto} />
        ))}
  </div>

  <Canasta producto={productos} canasta={canasta} />
  <ToastContainer autoClose={1600} />
  <div className="contenedor-detalles">
    <h3>Total = ${total}</h3>
    <Link className="Link" to={"/Mesas"}>
      <div>
        <h3>{mesa.idMesa}</h3>
      </div>
    </Link>
    <button onClick={() => openModal()} className="btn-pedir">
      Finalizar Pedido
    </button>
    
  </div>
</div> 
</>
  )
}

export default oldMenu