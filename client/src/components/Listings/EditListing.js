import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';
import {updateListing} from "../../actions/listadosActions";

const SERVERLINK = process.env.REACT_APP_SERVERLINK;


class EditListing extends Component {
    constructor(){
        super();
        this.state={
            listingId:"",
            title: "",
            description: "",
            estados:{},
            location: {
                stateName: "",
                city: "",
            },
            price: "",
            categoryList:{},
            chosenCategory:"",
            chosenSubCategory:"",
            images: [],
           // tags: "",
            userId:"",
        }
    }

    componentDidMount(){
    
        this.fetchCategories();
        this.fetchStates();
        this.fetchListingInfo();
    }

    fetchListingInfo= () => {
        fetch(`${SERVERLINK}/api/listados/${this.props.params.listingId}/getInfo`)
        .then(res=> res.json())
        .then(data=> {
            console.log({"data":data});
            this.setState({
            listingId:data._id,
            title: data.title,
            description: data.description,
            price: data.price,
           // img: data.img,
            chosenCategory: data.category,
            chosenSubCategory: data.subcategory, 
            location:{
                stateName: data.location.stateName,
                city: data.location.city
            },
            images: data.images, 
            userId: data.userID     
          });
        })
        .catch(err => console.log(err, "error fetching Listing"))
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
      
    fetchCategories = () => {
      
        fetch(`${SERVERLINK}/api/listados/data/categorylist`)
        .then(res=>res.json())
        .then(data =>{
          this.setState({categoryList: data})
        })
    }
      

    deleteImage = (index) => {
        const images = this.state.images;
        images.splice(index,1); //elimina la imagen a la que pertenezca el index
        this.setState({images:images}) 
    }

    onChange = (e) => {
      this.setState({[e.target.name]:e.target.value}) ;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const listingData={
            listingId: this.state.listingId,
            title: this.state.title,
            description: this.state.description,
            location: {
                stateName: this.state.location.stateName,
                city: this.state.location.city,
            },
            category:this.state.category,
            price: this.state.price,
            images: this.state.images,
            userId:this.state.userId
           // tags: "",
        }

        this.props.updateListing(listingData);
    }
      /* Hay 
      que 
      proteger la
      ROUTEEEEE
      con el ID
      */

  render() {
    return (
        <div>
            <h1>Editar Listado</h1>
            {/*noValidate indica que el form 
        no validara que tipo de dato esta en cada input */}
            <form noValidate onSubmit={this.onSubmit}>

                <div>
                    <label class="form-label">Titulo:</label>
                    <input 
                    class="form-control"
                    name = "title"
                    value={this.state.title}
                    onChange={this.onChange}
                    />
                </div>

                <div>
                    <label class="form-label">Descripcion:</label>
                    <textarea 
                    class="form-control"
                    name = "description"
                    value={this.state.description}
                    onChange={this.onChange}
                    />
                </div>

                <div>
                    <label class="form-label">Precio:</label>
                    <input 
                    class="form-control"
                    name = "price"
                    value={this.state.price}
                    onChange={this.onChange}
                    />
                    
                </div>

                <div className="input-field col s12">
       
        <label class="form-label" for="category">Categoria:</label>
            <select class="form-select" value={this.state.chosenCategory} id="categoryOption" onChange={(e) => 
                {
                        this.setState({chosenCategory: e.target.value})
                }}>
                {Object.keys(this.state.categoryList).map(function(item,i){
                    /*if (this.state.estadoEscogido===item){
                        return <option key={i} selected>{item.stateName}</option>}
                    else{  no funciona porque cambia el state antes de montar el componente*/
                            return <option key={i}>{item}</option>
                        
                    
                })}
            </select>
        </div>

        <div className="input-field col s12">
       
        <label class="form-label" for="subcategory">Subcategoria:</label>
            <select class="form-select" value={this.state.subcategory} id="subcategoryOption" onChange={(e) => 
                {
                        this.setState({chosenSubCategory: e.target.value})
                        console.log({chosenSubcategory: this.state.chosenSubCategory})
                }}>
                {this.state.categoryList[`${this.state.chosenCategory}`]?.map(function(item,i){
                    /*if (this.state.estadoEscogido===item){
                        return <option key={i} selected>{item.stateName}</option>}
                    else{  no funciona porque cambia el state antes de montar el componente*/
                            return <option key={i}>{item}</option>
                        
                    
                })}
            </select>
        </div>
  
        <div>
            <label class="form-label" for="estados">Estado:</label>
                <select class="form-select" value={this.state.location.stateName} id="estadosOption" onChange={(e) => 
                    {
                            this.setState({location:{stateName:e.target.value}})
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
                <select class="form-select" value={this.state.location.city} name="ciudades" id="ciudadesOption" onChange={(e) => 
                    {
                        this.setState({location:{city:e.target.value}})
                    }}>
                    {this.state.estados[`${this.state.location.stateName}`]?.map(function(item,i){
                        /*if (this.state.ciudadEscogida===item.stateName){
                            //esto quiebra porque estamos involucrando al state
                            return <option key={i} selected>{item.stateName}</option>}
                        else{*/
                                return <option key={i}>{item}</option>
                            
                        
                    })}
                </select>
        </div>
                

                <div class="row">
                {this.state.images?.map((item, i)=>{
                  return <div class="col-5 m-2">
                    <img id={`image-${i}`} class="img-fluid img-thumbnail" style={{width:"13em", height:"13em"}} src={item} alt="uploaded-image"/>
                    <button type="button" onClick={()=>{this.deleteImage(i)}} id={`btn-${i}`}>Eliminar</button>
                    
                  </div>
                })
                
                }
                </div>

                <button class="btn btn-primary my-5">Agregar Imagen</button>

                <div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                </div>
            </form>
            
        </div>
    )
  }
}

const WrapperEditListing = props => {
    const navigate = useNavigate();
    const params = useParams();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <EditListing
        navigate = {navigate}
        params = {params}
        {...props}
        />
    )
  
  }
  
  EditListing.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    listing: state.listings,
    errors: state.errors,
  
  });
  
  export default connect(
    mapStateToProps,
    {updateListing}
  )(WrapperEditListing);
  