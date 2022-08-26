import React, { Component, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {useSearchParams} from 'react-router-dom'

const SERVERLINK = process.env.REACT_APP_SERVERLINK;    

const ResetPassword = () => {

    let [searchParams] = useSearchParams();

    let [state, setState] = useState({
        email: '',
        token: '',
        newPassword: '',
        verifyPassword: '',
        errors :{}
      });
    
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect (() => {
        setState({...state, email:email, token:token})
    },[])
   
    const onSubmit = async e => {
        e.preventDefault();
        if(state.newPassword===state.verifyPassword){
            const data = {
                email : state.email,
                token: state.token,
                newPassword: state.newPassword,
                verifyPassword: state.verifyPassword
            }
    
            console.log(data);
    
            try {
                const res = await axios.post(`${SERVERLINK}/api/users/auth/reset_password`, data);
                alert(res.data.message);
            }
            catch(err){
                console.log({err:"error reseting password: " + err})
                alert("link inválido o vencido, solicite otro")
            }
        }else{
            setState({...state, 
                errors:{
                    passwordsDoesNotMatch: "Contraseñas no coiniciden"
                }
        })
        }

        
       
    };

    const onChange = e => {
        setState({...state, [e.target.id]: e.target.value });
        console.log(state);
    };
    
    return (
      <div class="container-fluid">
            <h1>Cambiar contraseña</h1>
            <div>
                <form noValidate onSubmit={onSubmit}>
                    <div>
                        <label class="form-label">Contraseña:</label>
                        <input 
                        class="form-control"
                        id='newPassword'
                        type="password"
                        onChange={onChange}
                        />
                    </div>

                    <div>
                        <label class="form-label">Confirmar Contraseña:</label>
                        <input 
                        class="form-control"
                        id='verifyPassword' 
                        type="password"
                        onChange={onChange}
                        />
                        <span class="text-danger">{state.errors.passwordsDoesNotMatch}</span>
                    </div>
                    
                    <button class="btn btn-primary" >Enviar</button>
                </form>
            </div>
      </div>
    )
  }

  export default ResetPassword;



