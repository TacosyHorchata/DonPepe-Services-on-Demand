import React, {Component} from 'react'
import {connect} from 'react-redux';
import { filterListings } from '../actions/listadosActions';
import {useNavigate} from 'react-router-dom'

const SERVERLINK = process.env.SERVERLINK;

class NavListados extends Component {


  constructor(props){
    super(props);
    this.state = {
      searchQuery:"",
      chosenCategory:"Categoría",
      chosenSubCategory:"Subcategoría",
      estadoEscogido:"Estado",
      ciudadEscogida:"Ciudad",
      categoryList:{},
      estados: {},

    }
  }

  componentDidMount(){
    this.fetchCities();
    this.fetchCategories();
}


fetchCities(){

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

onSubmit = () => {
  const querySearch ={
    type: 'text', 
    query: this.state.searchQuery,
    category: this.state.chosenCategory,
    subcategory: this.state.chosenSubCategory,
    stateName: this.state.estadoEscogido,
    city: this.state.ciudadEscogida
  }
  this.props.filterListings(querySearch)
  .then(res => {
    this.props.navigate(`/=${this.state.searchQuery}/search`);
  })
}

onChange = (e) =>{
  this.setState({[e.target.name]:e.target.value})
  console.log({state: this.state})
}

  render() {
    return (
      <div>
        
        <div class="m-5" name="searchForm">
          <div class="input-group">
           
            <input type="text" 
            name="searchQuery" 
            placeholder="Diseñador gráfico..."
            value={this.state.searchQuery} 
            onChange={this.onChange}
            class="form-control" aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm"/>

            <button type="button"
            class="btn btn-primary"
            onClick={this.onSubmit}
            >
            Buscar
            <i class=""></i>
            </button>

          </div>
        <div class="row">
          <div class="col-6">

          <div>
            
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
     
                <select class="form-select" value={this.state.chosenSubCategory} id="subcategoryOption" onChange={(e) => 
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
          </div>
          

          <div class="col-6">
            <div>
            
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
            </div>   
          </div>
        </div>
      </div>
    )
  }
}

const WrapperNavListados = props => {
  const navigate = useNavigate();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <NavListados
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
  {filterListings}
)(WrapperNavListados);
