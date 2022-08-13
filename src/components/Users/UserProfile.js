import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchListing } from "../../actions/listadosActions";

import ListingList from "../Listings/ListingList";


class UserProfile extends Component {
  constructor(){
      super();
    this.state={
      username: "",
      name: "",
      location: {
        stateName: "",
        city: "",
        country: "",
    },
    userInfo: {
        profile_img: "",
        phone: "",
        description: "",
        reputation: "",
    },
    listings: [],
    }


  }


  componentDidMount(){
    this.fetchListingInfo();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  fetchListingInfo= () => {
    fetch(`/api/users/${this.props.params.id}/userInfo`)
        .then(res => res.json())
        .then(data => {
        this.setState({...this.state, 
            name:data.name,
            userInfo:{description:data.userInfo.description} ,
            email:data.email, 
            listings:data.listingsList, 
            estadoEscogido: data.location.stateName,
            ciudadEscogida: data.location.city});

        }
        )
        
        .catch(error => {
            if (error.name === 'AbortError') return
            // if the query has been aborted, do nothing
            throw error
          })
  }

  render() {
    return (
      <div>
      
      <h2>{this.state.name}</h2>
      <h3> Descripcion: {this.state.description}</h3>
      <h2>{this.state.email}</h2>
      {/*Las imagenes se deben conseguir de la DB y mapearlas */}
      <p>Ubicacion: {this.state.estadoEscogido + "," + this.state.ciudadEscogida}</p>
      
      <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"/>

      <h2>Publicaciones: </h2>
      
      <ListingList filteredListings={this.state.listings}/>
      {/* creo que renderiza antes de actualizar el state*/}
      </div>
     
    )
  }
}

const WrapperUserProfile = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <UserProfile
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )

}

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {fetchListing}
)(WrapperUserProfile);

