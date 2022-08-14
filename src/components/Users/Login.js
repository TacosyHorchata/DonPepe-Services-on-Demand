import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useNavigate } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
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
              Back to home
            </Link>
            <div class="col-12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p class="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div class="input-field col-12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  class = {classnames('',{invalid: errors.email || errors.emailnotfound})}
                />
                <label htmlFor="email">Email</label>
                <span class='red-text'>
                  {errors.email}
                  {errors.emailnotfound}
                  </span>
              </div>
              <div class="input-field col-12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  class={classnames('', {
                    invalid: errors.password || 
                    errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span class="red-text">
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
                  class="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
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

export default connect(
  mapStateToProps,
  {loginUser}
)(WrapperLogin);