import axios from 'axios';
import { FILTER_LISTINGS, GET_ERRORS, SET_CURRENT_USER} from "./types"

const SERVERLINK = process.env.SERVERLINK;

/*export const crearUserListados = (id) => dispatch =>{
    axios
      .post(`api/listados/:${listadoData._id}`, id)
      .then(res=> {return res}/*res=> navigate('/confirmacion/publicacionexitosa'//) 
      //re-direct to login on successful register
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.date
          })
      );    
  } */

export const publishListing = (listingsData) => dispatch =>{
  axios
    .put(`${SERVERLINK}/api/listados/publicarListado/${listingsData._id}`, listingsData)
    .then(res=> {
    /*res=> navigate('/confirmacion/publicacionexitosa'*/
        alert("Anuncio publicado con éxito")
        console.log(res)
    }) 
    //re-direct to login on successful register
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    )};
    
export const fetchListing = (id) => dispatch =>{

    fetch(`${SERVERLINK}/api/listados/${id}/getListing`)
    .then (res =>{
        return res;
    })
};

export const filterListings = query => async dispatch =>{

    try {
        const response = await axios.post(`${SERVERLINK}/api/listados/search`, query);

        dispatch({
            type: FILTER_LISTINGS,
            payload: response.data
        });
        console.log(response.data);
    }
    catch(err){
        console.log(err, "filterListings api error: ");
        /*dispatch ({type: STOP_LOADING});
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data.errorMessage
        })*/

    }
    
};

export const updateListing = (listingData) => dispatch => {

    axios
    .put(`${SERVERLINK}/api/listados/update`, listingData)
    .then(res => {
       console.log({res: res})


    })
    .catch(err=>console.log(err))
}

export const addListingToFav = (data) => {

    axios
    .put(`${SERVERLINK}/api/users/update/${data.id}/addtofavorites`, data)
    .then(data => console.log({respuesta:data}))
    .catch(err=>console.log(err))
}


