import axios from "axios";

  
  const api = process.env.REACT_APP_API;


export const traerProductos = async()=>{
    const res = await  axios(api+"/productos")

    const productos = res.data
    const productos2 =  productos.map((producto)=>{
      const nuevaImagen= imagenProducto(producto.Imagen)
      return{...producto, Imagen:nuevaImagen}
    })
    
    
    
    return(productos2)

    // productos.map((producto)=>{
    //   return {...producto, Imagen:imagenProducto(producto.Imagen)}
    //  })
    
    
    


   

   
  
   
  
  }


  export const actualizarProductos = (formData) => {
    return axios.put(api+"/productos", formData).then((res) => res.data);
    
  }

  export const crearProducto = (formData) => {
    return axios.post(api+"/productos", formData).then((res) => res.data);
    
  }

  export const deleteProducto = (id) => {
    return axios.delete(api+"/productos/"+id).then((res) => res.data);
  }

 export const imagenProducto = (imagen) =>{
  const http = imagen.startsWith("http")
  if(http) return imagen
  else return (api+imagen)
  

 }

export const productoListo = async (producto) => {
  const { codProducto, idPedido, idRegistro, Nombre } = producto;
  const res = await axios.put(api+"/productos/listo", {
    codProducto,
    idPedido,
    idRegistro,
    Nombre,
  });
  return res.data;
}

export const productoCancelado = async (producto) => {
  const { codProducto, idPedido, idRegistro, Nombre } = producto;
  const res = await axios.put(api+"/productos/cancelado", {
    codProducto,
    idPedido,
    idRegistro,
    Nombre,
  });
  return res.data;
}