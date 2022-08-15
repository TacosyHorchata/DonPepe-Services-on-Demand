import { useSelector } from "react-redux";
import {
    Navigate
} from 'react-router';

const PublicRoute = ({children}) =>{
    const authState = useSelector((state) => state.auth);
    if (authState.isAuthenticated){
        return <Navigate to = '/'/>
    }

    return children;
}




export default PublicRoute;

//reescribir a mano este codigo
// buscar como usar useSelector y 