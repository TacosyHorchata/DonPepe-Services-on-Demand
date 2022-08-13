import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FAVORITES_CURRENT_USER
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {
    },
    loading: false
};

export default function (state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                /*user: action.payload */
                user: action.payload
            }
        case SET_FAVORITES_CURRENT_USER:
            return{
                ...state, 
                user:{
                    id: state.user.id,
                    name: state.user.name,
                    email: state.user.email,
                    location:{
                        stateName: state.user.location.stateName, 
                        city: state.user.location.city
                    },
                    listings: state.user.listings,
                    favorites: action.payload
                }
            }
        case USER_LOADING: 
            return{
                loading: true
            }
        default: 
            return state;
    }
}

