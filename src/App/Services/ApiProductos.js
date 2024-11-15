import axios from "axios";

const api = process.env.REACT_APP_API;

// Configuración base para axios global
axios.defaults.baseURL = api;
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';


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
    const { data } = await axios.get(ENDPOINTS.PRODUCTOS);
    return data.map(producto => ({
      ...producto,
      Imagen: imagenProducto(producto.Imagen)
    }));
  } catch (error) {
    handleError(error, 'Error al obtener productos');
  }
};

export const actualizarProductos = async (formData) => {
  try {
    const { data } = await axios.put(ENDPOINTS.PRODUCTOS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al actualizar producto');
  }
};

export const crearProducto = async (formData) => {
  try {
    const { data } = await axios.post(ENDPOINTS.PRODUCTOS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    handleError(error, 'Error al crear producto');
  }
};

export const deleteProducto = async (id) => {
  try {
    if (!id) throw new Error('ID de producto no proporcionado');
    const { data } = await axios.delete(`${ENDPOINTS.PRODUCTOS}/${id}`);
    return data;
  } catch (error) {
    handleError(error, 'Error al eliminar producto');
  }
};

export const productoListo = async (producto) => {
  try {
    validateProductoStatus(producto);
    const { data } = await axios.put(ENDPOINTS.PRODUCTO_LISTO, {
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

export const productoCancelado = async (producto) => {
  try {
    validateProductoStatus(producto);
    const { data } = await axios.put(ENDPOINTS.PRODUCTO_CANCELADO, {
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
  console.log(producto);
  const requiredFields = ['codProducto', 'idPedido', 'idRegistro', 'Nombre'];
  const missingFields = requiredFields.filter(field => 
    producto[field] === undefined || producto[field] === null || producto[field] === ''
  );
  
  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }
}

// Agregar el interceptor de respuesta al axios global
axios.interceptors.response.use(
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