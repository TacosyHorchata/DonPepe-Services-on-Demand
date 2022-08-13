import {
    FILTER_LISTINGS,
    LOADING_LISTINGS
} from '../actions/types';

const initialState = {
    listings:[],
    loading:false,
};

export default function (state = initialState, action){
    switch(action.type){
        case FILTER_LISTINGS:
            return {
                listings: action.payload
            }
        case LOADING_LISTINGS: 
            return{
                loading: true
            }
        default: 
            return state;
    }
}

