import React, { Component } from "react";
import { Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { GET_ERRORS } from "../../actions/types";

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors : {}
        };
    }
    componentDidMount(){
        this.props.resetErrors();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated){
            props.navigate('/')
            
        }
        if (props.errors !== state.errors){
            return { errors: props.errors }
        }
        return (null)
    }

    onChange = e =>{
        this.setState({[e.target.id]: e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.resetErrors();
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
        };
        /*las funciones como props se pasan sin parentesis
        todo el pedo fue que la estaba poniendo con PARENTESIS 
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh*/
        this.props.registerUser(newUser, this.props.navigate)
        
    }
    
    
    render() {
        const {errors} = this.state;
       
    return (
        <div className="container">

            <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                Regresar al inicio
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Registrarse</b>
                </h4>
                <p className="grey-text text-darken-1">
                    ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
                </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                    class="form-control"
                    onChange={this.onChange}
                    value={this.state.name}
                    name = 'name' 
                    id="name"
                    type="text"
                    required/>
                    <span className="text-danger"> {errors.name}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label>
                    <input
                    class="form-control"
                    onChange={this.onChange}
                    value={this.state.email}
                    name = 'email'
                    id="email"
                    type="email"
                    required/>
                    
                    <span className="text-danger"> {errors.email}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Contraseña</label>
                    <input
                    class="form-control"
                    onChange={this.onChange}
                    value={this.state.password}
                    name = 'password'
                    id="password"
                    type="password"
                    required/>
                    <span className="text-danger"> {errors.password}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password2">Confirmar contraseña</label>
                    <input
                    class="form-control"
                    onChange={this.onChange}
                    value={this.state.password2}
                    id="password2"
                    type="password"
                    required/>
                    <span class="text-danger"> {errors.password2}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                    Registrarse
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        );
    }
    }

const WrapperRegister = props => {
    const navigate = useNavigate();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <Register
        navigate = {navigate} 
        {...props}
        />
    )

}


Register.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

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
      registerUser: (userData, navigate) => dispatch(registerUser(userData, navigate)),

    });
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrapperRegister);