import React, { Component } from "react";
import { Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';



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
        if(this.props.auth.isAuthenticated){
            //this.props.navigate si funcione, entonces ComponentDidMount is deprecated?
            //ya no funciona, lo utlimo que hice fue agregar static getnose que
            console.log('Authenticated')
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated){
            props.navigate('/')
            
        }
        return (null)
    }

    onChange = e =>{
        this.setState({[e.target.id]: e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
        };
        /*las funciones como props se pasan sin parentesis
        todo el pedo fue que la estaba poniendo con PARENTESIS 
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh*/
        this.props.registerUser(newUser, this.props.navigate);
        
    }
    
    
    render() {
        const {errors} = this.state;
        
       
    return (
        <div className="container">

            <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                </div>
                <form noValidate onSubmit={this.onSubmit} >
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.name}
                    name = 'name'
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames('', {
                        invalid:errors.name
                    })}
                    />
                    <label htmlFor="name">Name</label>
                    <span className="red-text"></span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.email}
                    name = 'email'
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames('', {
                        invalid:errors.email
                    })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text"></span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.password}
                    name = 'password'
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames('', {
                        invalid:errors.password
                    })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text"></span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames('', {
                        invalid:errors.password2
                    })}
                    />
                    <label htmlFor="password2">Confirm Password</label>
                    <span className="red-text"></span>
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
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Sign up
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

export default connect(
    mapStateToProps,
    {registerUser}
)(WrapperRegister);