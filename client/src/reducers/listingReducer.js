import { ActivityIndicator } from 'react-native-web';
import {
    FILTER_LISTINGS,
    LISTINGS_LOADING,
    LISTINGS_LOADING_COMPLETE
} from '../actions/types';

const initialState = {
    listings:[],
    loading:false,
};

export default function (state = initialState, action){
    switch(action.type){
        case FILTER_LISTINGS:
            return {
                ...state,
                listings: action.payload
            }
        case LISTINGS_LOADING: 
            return{
                ...state,
                loading: action.payload
            }
        default: 
            return state;
    }
}

