import { useSelector } from "react-redux";
import {
    Navigate, useParams
} from 'react-router';


const PrivateRoute = ({children}) =>{
    const params = useParams();
    const authState = useSelector((state) => state.auth);
    console.log({paramId : params.id, userId: authState.user.id })
    if (!authState.isAuthenticated){
        return <Navigate to = '/login'/>
    } else if (params.userId && authState.user.id !== params.userId){
        return <Navigate to = '/notAllowed'/>
        //indica que no tienes permiso para ingresar
    }

    return children;
}




export default PrivateRoute;

