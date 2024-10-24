import axios from "axios";

const api = process.env.REACT_APP_API;

// Configuración de axios
const axiosInstance = axios.create({
  baseURL: api,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Manejador global de errores
const handleError = (error, customMessage) => {
  const errorMessage = error.response?.data?.error 
    || error.message 
    || customMessage 
    || 'Error en la operación';

  console.error(errorMessage, error);
  throw new Error(errorMessage);
};

// Constantes
const ENDPOINTS = {
  PRODUCTOS: '/productos',
  PRODUCTO_LISTO: '/productos/listo',
  PRODUCTO_CANCELADO: '/productos/cancelado'
};
//la imagen está en la carpeta public de react
const DEFAULT_IMAGE = '/default.jpg';

/**
 * Procesa la URL de la imagen del producto
 * @param {string} imagen - Ruta de la imagen
 * @returns {string} URL completa de la imagen
 */
export const imagenProducto = (imagen) => {
  if (!imagen) return `${DEFAULT_IMAGE}`;
  if (imagen.startsWith('http')) return imagen;
  return `${api}${imagen}`;
};

/**
 * Trae todos los productos
 * @returns {Promise<Array>} Array de productos con URLs de imagen procesadas
 */
export const traerProductos = async () => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.PRODUCTOS);
    
    return data.map(producto => ({
      ...producto,
      Imagen: imagenProducto(producto.Imagen)
    }));
  } catch (error) {
    handleError(error, 'Error al obtener productos');
  }
};

/**
 * Actualiza un producto
 * @param {FormData} formData - Datos del producto a actualizar
 * @returns {Promise<Object>} Producto actualizado
 */
export const actualizarProductos = async (formData) => {
  try {
    const { data } = await axiosInstance.put(ENDPOINTS.PRODUCTOS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al actualizar producto');
  }
};

/**
 * Crea un nuevo producto
 * @param {FormData} formData - Datos del nuevo producto
 * @returns {Promise<Object>} Producto creado
 */
export const crearProducto = async (formData) => {
  try {
    const { data } = await axiosInstance.post(ENDPOINTS.PRODUCTOS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al crear producto');
  }
};

/**
 * Elimina un producto
 * @param {string|number} id - ID del producto a eliminar
 * @returns {Promise<Object>} Resultado de la eliminación
 */
export const deleteProducto = async (id) => {
  try {
    if (!id) throw new Error('ID de producto no proporcionado');
    const { data } = await axiosInstance.delete(`${ENDPOINTS.PRODUCTOS}/${id}`);
    return data;
  } catch (error) {
    handleError(error, 'Error al eliminar producto');
  }
};

/**
 * Marca un producto como listo
 * @param {Object} producto - Datos del producto a marcar como listo
 * @returns {Promise<Object>} Resultado de la operación
 */
export const productoListo = async (producto) => {
  try {
    validateProductoStatus(producto);
    const { data } = await axiosInstance.put(ENDPOINTS.PRODUCTO_LISTO, {
      codProducto: producto.codProducto,
      idPedido: producto.idPedido,
      idRegistro: producto.idRegistro,
      Nombre: producto.Nombre
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al marcar producto como listo');
  }
};

/**
 * Marca un producto como cancelado
 * @param {Object} producto - Datos del producto a cancelar
 * @returns {Promise<Object>} Resultado de la operación
 */
export const productoCancelado = async (producto) => {
  try {
    validateProductoStatus(producto);
    const { data } = await axiosInstance.put(ENDPOINTS.PRODUCTO_CANCELADO, {
      codProducto: producto.codProducto,
      idPedido: producto.idPedido,
      idRegistro: producto.idRegistro,
      Nombre: producto.Nombre
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al cancelar producto');
  }
};

// Funciones auxiliares
function validateProductoStatus(producto) {
  const requiredFields = ['codProducto', 'idPedido', 'idRegistro', 'Nombre'];
  const missingFields = requiredFields.filter(field => !producto[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }
}

// Interceptor para manejar errores de red
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Por favor, intente nuevamente.');
    }
    if (!error.response) {
      throw new Error('Error de red. Por favor, verifique su conexión.');
    }
    throw error;
  }
);

export default {
  traerProductos,
  actualizarProductos,
  crearProducto,
  deleteProducto,
  productoListo,
  productoCancelado,
  imagenProducto
};