import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useNavigate } from 'react-router-dom';

import {GET_ERRORS} from '../../actions/types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount(){
    this.props.resetErrors();
  } 


 /* componentDidMount(){
    
    /*if logged in and user navigates to Register page
    ,should redirect them to dashboard
    if(this.props.auth.isAuthenticated){
      /* por que rayos tengo que utilizar this.props.useNavigate y no solo navigate() 
        this.props.useNavigate('/');
    }
};*/

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated){
        props.navigate('/')
        
    }

    if (props.errors !== state.errors){
      return { errors: props.errors }
    } 
    return (null)
  }
/*
    if (nextProps.errors){
      this.setState({
        errors: nextProps.errors
      });
    }*/
  

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    this.props.resetErrors();
const userData = {
      email: this.state.email,
      password: this.state.password
    } ;
this.props.loginUser(userData);
  };
render() {
    const { errors } = this.state;
    if(this.props.auth.isAuthenticated){
      this.props.navigate('/')
  }
return (
      <div class="container-fluid">
        <div style={{ marginTop: "4rem" }} class="row">
          <div class="col-8 offset-s2">
            <Link to="/" class="btn-flat waves-effect">
              Regresar al inicio
            </Link>
            <div class="col-12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Iniciar Sesión</b> 
              </h4>
              <p class="grey-text text-darken-1">
               ¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  class="form-control"
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                required/>   
                <span class='text-danger'>
                  {errors.email}
                  {errors.emailnotfound}
                  </span>
              </div>
              <div class="input-field col-12">
                <label htmlFor="password">Contraseña</label>
                <input
                  class="form-control"
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                required/>
                <span class="text-danger">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div class="col-12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  class="btn btn-primary"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const WrapperLogin = props => {
  const navigate = useNavigate();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <Login 
      navigate = {navigate}
      {...props}
      />
  )

}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return ({
    resetErrors: () => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    },
    loginUser: (userData) => dispatch(loginUser(userData)),

  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperLogin);