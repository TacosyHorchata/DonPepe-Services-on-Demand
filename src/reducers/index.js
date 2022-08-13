import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import authReducer from './authReducer';
import listingReducer from './listingReducer';
import locationReducer from './locationReducer';
import errorReducer from './errorReducer';



const reducer = combineReducers({
    /*le asigna el nombre que quieras al reducer
    porque lo unico que se exporta de ese archivo es el reducer*/
    auth: authReducer,
    location: locationReducer,
    listings: listingReducer,
    errors: errorReducer
})

const persistConfig ={
    key: 'root',
    storage, 
}

export default persistReducer(persistConfig,reducer)