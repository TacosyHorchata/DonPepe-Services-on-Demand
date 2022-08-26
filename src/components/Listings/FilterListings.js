import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchListing } from "../../actions/listadosActions";
import ListingList from "./ListingList";
import NavListados from "../NavListados";



class FilterListings extends Component {
  constructor(){
      super();
    this.state={
      errors: {}
    }
  }

  render() {
    const {listings} = this.props.listings
    return (
      <div>
      <br/>
      <h1 class="text-center">BUSCADOR</h1>
      <NavListados/>
      {listings.length>0 ?
        (<ListingList filteredListings={listings}/>)
        :
        (<div>
          
          <h3 class="text-danger text-center">No existen coincidencias</h3>
          <br/>
          <p class="text-danger text-center">Intente con otros términos de busqueda, deje en blanco la categoría o la ubicación.</p>
          <br/>
          <br/>
          <br/>
         </div> 
        )
      }
      
    
      </div>
    )
  }
}

const WrapperFilterListings = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <FilterListings
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )

}

FilterListings.propTypes = {
  auth: PropTypes.object.isRequired,
  listings: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  listings: state.listings,
  errors: state.errors,

});

export default connect(
  mapStateToProps,
)(WrapperFilterListings);

