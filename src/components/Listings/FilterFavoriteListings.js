import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';

import { filterListings } from "../../actions/listadosActions";

import ListingListFavorites from "./ListingListFavorites";



class FilterFavoriteListings extends Component {
  constructor(){
      super();
    this.state={
      userFavorites:[],
      errors: {}
    }
  }

  componentDidMount(){
    const data = {
      type:'idListingsArray',
      query: this.props.auth.user.favorites
    }
    this.props.filterListings(data)
    .then(res=>this.setState({userFavorites:this.props.listings.listings}))
    
  }
  render() {
    return (
      <div class="container-fluid">
      <h1>Favoritos</h1>
      <ListingListFavorites filteredListings={this.state.userFavorites}/>
    
      </div>
    )
  }
}

const WrapperFilterFavoriteListings = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <FilterFavoriteListings
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )

}

FilterFavoriteListings.propTypes = {
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
  {filterListings}
)(WrapperFilterFavoriteListings);

