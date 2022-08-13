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
    return (
      <div>
      
      <h1>BUSCADOR</h1>
      <NavListados/>
      <ListingList filteredListings={this.props.listings.listings}/>
    
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

