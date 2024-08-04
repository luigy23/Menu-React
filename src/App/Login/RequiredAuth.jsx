


//importamos lo necesario para el contexto de redux
import { useSelector } from "react-redux";
import Login from "../Pages/Login";


const RequireAuth = ({ children}) => {


    const state = useSelector((state) => state); //estado
    const {isAuthenticated} = state.usuario; //destructuración del estado


    return ( !isAuthenticated ? <Login/> : children )








    
    };

export default RequireAuth