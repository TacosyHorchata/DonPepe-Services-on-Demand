import axios from 'axios';
import { 
    GET_ERRORS, 
    SET_CURRENT_USER,
    USER_LOADING, 
    SET_FAVORITES_CURRENT_USER
    } from "./types"
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken';

const SERVERLINK = process.env.SERVERLINK;

export const registerUser = (userData, navigate) =>
dispatch => {
    axios
    .post(`${SERVERLINK}/api/users/register`, userData)
    .then (res=> navigate('/login')) 
    //re-direct to login on successful register
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.date
        })
    );    
};

export const loginUser = (userData) => dispatch =>{
    
    axios
    .post(`https://servicescommunity.herokuapp.com/api/users/login`, userData)
    .then(res =>{
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);

        setAuthToken(token);
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));

        
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateUser = (userData) => async dispatch => {
    

    try {
        const response = await axios.post(`${SERVERLINK}/api/users/update`, userData);

        const user = {
            id : response.data._id,
            name: response.data.name,
            email: response.data.email,
            listings: response.data.listings,
            location: {
                stateName: response.data.location.stateName,
                city: response.data.location.city,
            }
        }

        dispatch({
            type: SET_CURRENT_USER,
            payload: user
            })
        console.log(user);

        alert("Usuario actualizado con exito");
    }
    catch(err){
        alert("Error actualizando usuario, vuelva a intentar");
        /*dispatch ({type: STOP_LOADING});
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data.errorMessage
        })*/

    }
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}))
}

export const reqUserInfo = (userId) => dispatch => {
    axios
    .get(`${SERVERLINK}/api/users/requestInfo`, userId)
    .then(res=> {return res})
    .catch(err=> console.log(err))
};

export const addListingToFav = (data) => async dispatch =>{

    try{
        const response = await axios.post(`${SERVERLINK}/api/users/update/${data.userId}/addtofavorites`, data);
        dispatch({
          type: SET_FAVORITES_CURRENT_USER,
          payload: response.data.favorites
        })
        console.log({respuesta:response});
    }catch(err){
        console.log(err);
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const setUserLoading = () =>{
    return{
        type: USER_LOADING
    };
};
