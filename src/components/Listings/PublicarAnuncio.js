import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { publishListing } from "../../actions/listadosActions";
import { useNavigate } from 'react-router-dom';
import { storage } from "../../firebase-config";
import axios from "axios";
import { 
  LISTINGS_LOADING,
 } from "../../actions/types"

const SERVERLINK = process.env.REACT_APP_SERVERLINK;

class PublicarAnuncio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      category: "",
      firebaseImage: [],
      categoryList:{},
      chosenCategory:"Categoria",
      chosenSubCategory:"Subcategoría",
      contactInfo:"",
      estados:{},
      estadoEscogido: this.props.auth.user.location.stateName,
      ciudadEscogida: this.props.auth.user.location.city,
      errors: {uploadingImg:false},
    };
  }

componentDidMount(){
  this.fetchStates();
  this.fetchCategories();
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = (e) => {
    e.preventDefault();

/* En esta funcion se guarda la imagen en firebase 
y llama a la funcion publishListing si la imagen se guarda
exitosamente
*/
this.saveListing("firebase");

};
/*setDefaultImage(uploadType){
  if(uploadType==="multer"){
    this.setState({
      multerImage: DefaultImg
    });
  }else if(uploadType==="firebase"){
    this.setState({
      firebaseImage:DefaultImg
    });

  }else{
    this.setState({
      baseImage:DefaultImg
    })
  }
}*/
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

saveListing = (method) =>{
  let loading = true;
  this.props.setIfLoading(loading);

  let imageObj = {};

  if(method==="firebase"){
   
    let imgInput = document.getElementById('imgInput');
    
    
    const promises = Object.values(imgInput.files).map((file, index) => {
      let currentImageName = file.name + Date.now();
      console.log({nombre: file});
      console.log({index: index});
      let ref = storage.ref(`images/${currentImageName}`);
      return ref.put(file).then(() => ref.getDownloadURL());
    })

    Promise.all(promises)
      .then((uploadedMediaList) => {
      console.log(uploadedMediaList, 'all');
      this.setState({firebaseImage:uploadedMediaList})
      console.log({uploadedMediaList: this.state.firebaseImage});


      const listingData = {
        _id: this.props.auth.user.id, 
        title: this.state.title,
        description: this.state.description,
        contactInfo: this.state.contactInfo,
        price: this.state.price,
        stateName: this.state.estadoEscogido,
        city: this.state.ciudadEscogida,
        category: this.state.chosenCategory,
        subcategory: this.state.chosenSubCategory,
        images: this.state.firebaseImage
      };
    
      console.log({listingData:listingData});

      this.props.publishListing(listingData, this.props.navigate)
      .then(res=>  this.props.setIfLoading(loading));
    })
    .catch((err) => {
    alert(err);
    this.setState({errors:{uploadingImg:true}})
    this.props.setIfLoading(loading);
    });
    let loading = false;
  }
}

render() {
    const { errors } = this.state;
return (
      <div className="container-fluid">
      <h1>Publicar Anuncio</h1>
        <div>
        <form onSubmit={this.onSubmit}>
        
        <div className="input-field col s12">
        <label class="form-label" htmlFor="titulo">Titulo</label>
          <input
            class="form-control"
            onChange={this.onChange}
            value={this.state.title}
            error={errors.title}
            id="title"
            type="text"
            required/>
          <span className='red-text'>
            {errors.titulo}
            </span>
        </div>

        <div className="input-field col s12">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            class="form-control"
            onChange={this.onChange}
            value={this.state.description}
            error={errors.description}
            id="description"
            type="text"
            required/>
          <span className="red-text">
            {errors.descripcion}
          </span>
        </div>

        <div className="input-field col s12">
          <label htmlFor="precio">Precio</label>
          <input
            class="form-control"
            onChange={this.onChange}
            value={this.state.price}
            error={errors.price}
            id="price"
            type="number"
            required/>
          <span className="red-text">
            {errors.precio}
          </span>
        </div>

        <div className="input-field col s12">
          <label htmlFor="categoria" class="text-wrap">Contacto(Celular o Email)</label>
          <input
            class="form-control"
            onChange={this.onChange}
            value={this.state.contactInfo}
            error={errors.contactInfo}
            id="contactInfo"
            type="text"
            required/>
          <span className="red-text">
            {errors.contactInfo}
          </span>
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
            <select class="form-select" id="subcategoryOption" value={this.state.chosenSubCategory} onChange={(e) => 
                {
                        this.setState({chosenSubCategory: e.target.value})
                        console.log({chosenSubcategory: this.state.chosenSubCategory})
                }} required>
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
                <select class="form-select" value={this.state.estadoEscogido} id="estadosOption" onChange={(e) => 
                    {
                            this.setState({estadoEscogido: e.target.value})
                            console.log({estadoEscogido: this.state.estadoEscogido})
                    }} required>
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
                    }} required>
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
          <label for="img">
            Subir imagenes:
          </label>
          <input class="form-control" id="imgInput" type="file" multiple required/>
          <div class="row">
          {this.state.firebaseImage?.map((item, i)=>{
            return <div class="col-5 m-2">
              <img class="img-fluid img-thumbnail" style={{width:"13em", height:"13em"}} src={item} alt="uploaded-image"/>
            </div>
          })
          }
          </div>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        {this.props.listings.loading ? 
        (
          <button
            className="btn btn-primary m-5" disabled>
              Publicar
          </button>
        )
        :
        (
          <button
          type="submit"
          className="btn btn-primary m-5">
            Publicar
        </button>
        )
        }
          
        </div>
      </form>
        </div>
      </div>
    );
  }
}

const WrapperPublicarAnuncio = props => {
    const navigate = useNavigate();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <PublicarAnuncio
        navigate = {navigate}
        {...props}
        />
    )
  
  }
  
  PublicarAnuncio.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    listings: state.listings,
    errors: state.errors
  });

  const mapDispatchToProps = (dispatch) => {
    return ({
      setIfLoading: (status) => {
        dispatch({
          type: LISTINGS_LOADING,
          payload: status,
        });
      },
      publishListing: (listingsData, navigate) => dispatch(publishListing(listingsData, navigate)),
    });
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WrapperPublicarAnuncio);