//ApiCategorias.js
import axios from 'axios';
const api = process.env.REACT_APP_API;

export const traerCategorias = async () => {
    const res = await axios(api + '/categorias');
    const categorias = res.data;
    return categorias;
    }
    
export const editarCategoria = async (id, Nombre) => {
    const res = await axios.put(api + '/categorias/' + id, {Nombre: Nombre});
    const categoriaEditada = res.data;
    return categoriaEditada;
    }

export const eliminarCategoria = async (id) => {
    const res = await axios.delete(api + '/categorias/' + id);
    const categoriaEliminada = res.data;
    console.log(categoriaEliminada);
    return categoriaEliminada;
    }

export const agregarCategoria = async (Nombre, Descripcion) => {
    const res = await axios.post(api + '/categorias', {Nombre: Nombre, Descripcion: Descripcion});
    const categoriaAgregada = res.data;
    return categoriaAgregada;
    }