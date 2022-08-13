import {
    REGISTER_USER,
    LOGIN_USER
} from '../actions/types'

export const registerUserDB = userData =>{
    return{
        type: REGISTER_USER,
        payload: userData
    }
}
export const loginUser = userData =>{
    return{
        type: LOGIN_USER,
        payload: userData
    }
}