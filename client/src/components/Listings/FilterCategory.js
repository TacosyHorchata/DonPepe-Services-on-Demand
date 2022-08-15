import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { filterListings } from "../../actions/listadosActions";
import ListingList from "./ListingList";
import NavListados from "../NavListados";

class FilterCategory extends Component {
  constructor(){
      super();
    this.state={
      categoryListings:[],
      errors: {}
    }
  }

  componentDidMount(){
   this.fetchCategoryAndSubcategory(); 
  }

  fetchCategoryAndSubcategory = () =>{
    let data;
    if(this.props.params.subcategoryName){
      data = {
        type:'category',
        category: this.props.params.categoryName,
        subcategory: this.props.params.subcategoryName
      }
    }else{
      data = {
        type:'category',
        category: this.props.params.categoryName,
        subcategory: "Subcategoría"
      }
    }
    
    this.props.filterListings(data)
    .then(res=>this.setState({categoryListings: this.props.listings.listings}));
  }

  render() {
    return (
      <div>
      
        <h1>{this.props.params.categoryName}{'>>'}{this.props.params.subcategoryName}</h1>
        <NavListados/>
        {this.state.categoryListings[0]
           ?
          <ListingList filteredListings={this.state.categoryListings}/>
          : null
        }
         
      
    
      </div>
    )
  }
}

const WrapperFilterCategory = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <FilterCategory
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )

}

FilterCategory.propTypes = {
  auth: PropTypes.object.isRequired,
  listings: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  listings: state.listings,
  errors: state.errors,

});

export default connect(
  mapStateToProps,
  {filterListings}
)(WrapperFilterCategory);
