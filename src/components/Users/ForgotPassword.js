import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const SERVERLINK = process.env.REACT_APP_SERVERLINK;

class ForgotPassword extends Component {

    constructor(props){
        super(props);

        this.state = {
            email:""
        };
    }


    onSubmit = async e => {
        e.preventDefault();

        const data = {
            email : this.state.email
        }

        try {
            await axios.post(`${SERVERLINK}/api/users/auth/forgot_password_email`, data);
        }
        catch(err){
            console.log({err:"error sending forgot_password email"})
        }
       
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

  render() {
    
    return (
      <div class="container-fluid">
            <br/>
            <h1 class="text-center">¿Olvidaste tu contraseña?</h1>
            <br/>
            <p>Ingresa el email asociado a tu cuenta.<br/>
                Te llegará un correo con un link para cambiar tu contraseña
            </p>
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <label class="form-label">Email:</label>
                    <input 
                    class="form-control"
                    id='email' 
                    onChange={this.onChange}
                    />
                    <br/>
                    <button type="submit" class="btn btn-primary" >Enviar Email</button>
                </form>
            </div>
      </div>
    )
  }
}

const WrapperForgotPassword = props => {
    const navigate = useNavigate();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <ForgotPassword 
        navigate = {navigate}
        {...props}
        />
    )
  
}

const mapStateToProps = state =>(
    {
        auth: state.auth,
        error: state.errors,
        listings: state.listings,
    }
)

export default connect(
    mapStateToProps, 
)(WrapperForgotPassword);
