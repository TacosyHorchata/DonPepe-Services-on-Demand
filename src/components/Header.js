import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logoutUser} from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { filterListings } from '../actions/listadosActions';



class Header extends Component {
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
      <div className='header container-fluid'>
      <h4 onClick={this.goToHome} className='header__logo'>Don Pepe</h4>
      
      <div className="header__nav"> 

          <div className='header__option'>
            <Link to='/publicar' class="text-decoration-none">
            <p class="text-light">Publicar Anuncio</p>
            </Link> 
              
          </div>

          <div className='header__option'>
            <Link to={`/micuenta/${this.props.auth.user.id}`} class="text-decoration-none"> 
             <div><p class="text-light">Mi Cuenta</p></div>
            </Link>
          </div>

      </div>
      <div>
      
        <p>{this.state.listings}</p>
      </div>
  </div>
    )
  }
}

const WrapperHeader = props => {
  const navigate = useNavigate();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <Header 
      navigate = {navigate}
      {...props}
      />
  )

}

Header.propTypes = {
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
  {logoutUser, filterListings}
)(WrapperHeader);