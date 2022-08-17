//aqui se construira el footer

import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logoutUser} from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { filterListings } from '../actions/listadosActions';



class Footer extends Component {
  constructor() {
    super();

    this.state={
      searchQuery:"",
      listings:[]
    }
}

componentWillReceiveProps(nextProps) {
  this.setState({listingsId:nextProps.filteredListings});
}


  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = () => {
    console.log(this.state.searchQuery);
    const data = {
      type: 'text',
      query: this.state.searchQuery
    }
    this.props.filterListings(data)
    .then(res => {
      this.props.navigate(`/${this.state.searchQuery}/search`);
    })
  }
  goToHome = () => {
    this.props.navigate('/');
  }

  render() {
    return (
      <div >

      <footer class="container-fluid py-5 my-4 border-top">
      <div class="row">
           {/* <div class="col-8 text-left">
            <h5>Categorías</h5>
            <div class="row container-fluid">
                <ul class="col-6 nav flex-column">
                    <li class="nav-item mb-2" style={{"font-weight":"bold"}}><a href="/category/Hogar" class="nav-link p-0 text-dark">Hogar</a></li>
                    <li class="nav-item mb-2"><a href="/category/Hogar/Electricidad#" class="nav-link p-0 text-muted">Electricidad</a></li>
                    <li class="nav-item mb-2"><a href="/category/Hogar/Plomería" class="nav-link p-0 text-muted">Plomería</a></li>
                    <li class="nav-item mb-2"><a href="/category/Hogar/Limpieza" class="nav-link p-0 text-muted">Limpieza</a></li>
                    <li class="nav-item mb-2"><a href="/category/Hogar/Construcción" class="nav-link p-0 text-muted">Construcción</a></li>
                </ul>
                <ul class="col-6 nav flex-column">
                    <li class="nav-item mb-2" style={{"font-weight":"bold"}}><a href="#" class="nav-link p-0 text-dark">Marketing</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Diseño Gráfico</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Marketing Digital</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Community Manager</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Email Marketing</a></li>
                </ul>


            </div>
    </div>*/}
    
            <div class="col-4 col-md-2 mb-3">
                <h5>Páginas de interés</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Acerca de Nosotros</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Inversionistas</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Contacto: soporteproera@gmail.com</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Politica de Privacidad</a></li>
                </ul>
            </div>
  
        </div>
        <div class="col-md-5  mb-3">
          <form>
            <h5>Sucribete a nuestro newsletter</h5>
            <p>Conoce nuestro progreso y visión.</p>
            <div class="d-flex flex-column flex-sm-row w-100 gap-2">
              <label for="newsletter1" class="visually-hidden">Correo Electrónico</label>
              <input id="newsletter1" type="text" class="form-control" placeholder="Correo Electrónico"/>
              <button class="btn btn-primary" type="button">Subscribe</button>
            </div>
          </form>
        </div>

  
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>&copy; 2022 Stellar, Inc. All rights reserved. Programmed by Pedro Ríos</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use /></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use /></svg></a></li>
          <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use /></svg></a></li>
        </ul>
      </div>
    </footer>
  </div>
    )
  }
}

const WrapperFooter = props => {
  const navigate = useNavigate();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <Footer
      navigate = {navigate}
      {...props}
      />
  )

}

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  location: state.location,
  listings: state.listings,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {filterListings}
)(WrapperFooter);