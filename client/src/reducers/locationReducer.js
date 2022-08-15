import {
    SET_LOCATION
} from '../actions/types';

const initialState = {
    userLocation: {
        stateName: '',
        city: ''
    }
};


export default function (state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return{
                ...state,
                userLocation:{
                    stateName: action.payload.state,
                    city: action.payload.city

                } 
            }
        default: 
            return state;
    }
}