import React, { useState } from 'react'
import { FontAwesomeIcon as Icono } from '@fortawesome/react-fontawesome'
import { faXmark, faMinus, faPlus, faComment, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { addToCart, calcularTotal, delToCart } from "../Actions/canastaActions"
import { useEffect } from 'react'
import "../Estilos/Canasta.scss"

const ItemCanasta = ({ data: producto }) => {
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [comment, setComment] = useState(producto.comentario || '')
  const dispatch = useDispatch()

  const { Nombre, Cantidad } = producto

  const restar = () => {
    dispatch(delToCart(producto.codProducto, producto.Cantidad, 2))
    dispatch(calcularTotal())
  }

  const sumar = () => {
    if (producto.Cantidad >= producto.Stock) {
      alert('No hay suficiente stock')
      return
    }
    dispatch(addToCart(producto.codProducto, producto.Cantidad, 1))
    dispatch(calcularTotal())
  }

  const borrar = () => {
    dispatch(delToCart(producto.codProducto, producto.Cantidad, 1))
    dispatch(calcularTotal())
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const saveComment = () => {
    // Instead of using addToCart, we should create a new action specifically for updating comments
    // For now, I'll show you how to modify the existing one
    dispatch({
      type: 'UPDATE_ITEM_COMMENT',
      payload: {
        codProducto: producto.codProducto,
        comentario: comment
      }
    })
    setIsEditingComment(false)
  }

  const cancelEdit = () => {
    setComment(producto.comentario || '')
    setIsEditingComment(false)
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm p-3 transition-all">
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <span className='text-base font-medium text-gray-800'>{Nombre}</span>
          <span className='text-sm text-gray-500'>Cantidad: {Cantidad}</span>
        </div>
        <div className='flex flex-wrap items-center gap-2'>

          <button
            className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            onClick={() => restar()}
          >
            <Icono icon={faMinus} className="text-gray-600" />
          </button>
          <button
            className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            onClick={() => sumar()}
          >
            <Icono icon={faPlus} className="text-gray-600" />
          </button>
          <button
              className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
              onClick={() => setIsEditingComment(!isEditingComment)}
            >
              <Icono icon={faComment} className="text-gray-600" />
            </button>

          <button
            className='w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors'
            onClick={() => borrar()}
          >
            <Icono icon={faXmark} className="text-red-600" />
          </button>
        </div>
      </div>

      {isEditingComment && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Agregar comentario..."
            />
    
            <button
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={saveComment}
            >
              <Icono icon={faCheck} />
            </button>
            <button
              className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={cancelEdit}
            >
              <Icono icon={faTimes} />
            </button>
          </div>
        </div>
      )}

      {!isEditingComment && comment && (
        <div className="mt-1 px-3 py-2 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {comment}
          </p>
        </div>
      )}

    </div>
  )
}

export default ItemCanasta