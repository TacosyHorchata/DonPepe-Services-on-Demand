import React, { Component } from 'react';
import {connect} from 'react-redux';
import { logoutUser, updateUser } from '../../actions/authActions';
import { filterListings } from '../../actions/listadosActions';
import {useNavigate} from 'react-router-dom'
import ListingList from '../Listings/ListingList';

const SERVERLINK = process.env.REACT_APP_SERVERLINK;

class MiCuenta extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            estados: {},
            name:"",
            email:"", 
            estadoEscogido: this.props.auth.user.location.stateName,
            ciudadEscogida: this.props.auth.user.location.city
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        if (!props.auth.isAuthenticated){
            props.navigate('/')   
        }
        return (null)
    }


    componentDidMount(){

        this.fetchStates();
        this.fetchUserInfo();
        //fetch listings
        const data = {
            type: 'userID',
            query: this.props.auth.user.id
          }
        this.props.filterListings(data)
          //finish fetch
    }


    fetchStates(){

        fetch(`${SERVERLINK}/api/location/mexicoEstadosYMunicipios`)
        .then(res => res.json())
        .then(data => {
            this.setState({estados:data});
        })
        .catch(error => {
            if (error.name === 'AbortError') return
            // if the query has been aborted, do nothing
            throw error
          })

    }

    fetchUserInfo(){

        fetch(`${SERVERLINK}/api/users/requestInfo/${this.props.auth.user.id}`)
        .then(res => res.json())
        .then(data => {
        this.setState({...this.state, 
            name:this.props.auth.user.name,
            email:this.props.auth.user.email, 
            estadoEscogido: this.props.auth.user.location.stateName,
            ciudadEscogida: this.props.auth.user.location.city
            });
        })
        .catch(error => {
            if (error.name === 'AbortError') return
            // if the query has been aborted, do nothing
            throw error
          })
    }

    goFavoritesPage = () => {
         this.props.navigate(`/micuenta/${this.props.auth.user.id}/favorites`);
    }
 
    logOut = () =>{
        this.props.logoutUser();
    }

    onSubmit = e => {
        e.preventDefault();

    const userData = {
        id: this.props.auth.user.id,
        name: this.state.name,
        email: this.state.email,
        stateName: this.state.estadoEscogido,
        city: this.state.ciudadEscogida
    }
    this.props.updateUser(userData);
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

  render() {
    
    return (
      <div class="container-fluid">
      
        <h1 >Mis datos</h1>
        <button onClick={this.logOut}>Cerrar Sesión</button>
        <button onClick={this.goFavoritesPage}>Favoritos</button>
        <form noValidate onSubmit={this.onSubmit}>
                    <label class="form-label">Nombre:</label>
                    <input 
                    class="form-control"
                    id='name' defaultValue={this.props.auth.user.name} 
                    onChange= {this.onChange}/>
            <div>
                <label class="form-label">Email:</label>
                <input 
                class="form-control"
                id='email' defaultValue={this.props.auth.user.email}  
                onChange={this.onChange}
                disabled/>
            </div>

            <div>
            <label class="form-label" for="estados">Estado:</label>
                <select class="form-select" value={this.state.estadoEscogido} id="estadosOption" onChange={(e) => 
                    {
                            this.setState({estadoEscogido: e.target.value})
                            console.log({estadoEscogido: this.state.estadoEscogido})
                    }}>
                    {Object.keys(this.state.estados).map(function(item,i){
                        /*if (this.state.estadoEscogido===item){
                            return <option key={i} selected>{item.stateName}</option>}
                        else{  no funciona porque cambia el state antes de montar el componente*/
                                return <option key={i}>{item}</option>
                            
                        
                    })}
                </select>
            </div>
            <div>        
                <label class="form-label" for="ciudad">Ciudad:</label>
                <select class="form-select" value={this.state.ciudadEscogida} name="ciudades" id="ciudadesOption" onChange={(e) => 
                    {
                            this.setState({ciudadEscogida: e.target.value})
                    }}>
                    {this.state.estados[`${this.state.estadoEscogido}`]?.map(function(item,i){
                        /*if (this.state.ciudadEscogida===item.stateName){
                            //esto quiebra porque estamos involucrando al state
                            return <option key={i} selected>{item.stateName}</option>}
                        else{*/
                                return <option key={i}>{item}</option>
                            
                        
                    })}
                </select>
            </div>
            <div>
                <label class="form-text">Foto: </label>
            </div>
            <button
                class="btn btn-primary"
                type="submit"
                >
                  Guardar
                </button>
        </form>
                <h2>Anuncios Activos</h2>
                <ListingList filteredListings={this.props.listings.listings} edit="yes"/>

      </div>
    )
  }
}

const WrapperMiCuenta = props => {
    const navigate = useNavigate();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <MiCuenta 
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
        location: state.location
    }
)

export default connect(
    mapStateToProps, 
    {logoutUser, updateUser, filterListings}
)(WrapperMiCuenta);
