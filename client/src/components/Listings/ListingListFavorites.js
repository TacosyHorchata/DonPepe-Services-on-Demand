import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {addListingToFav} from '../../actions/authActions'

class ListingList extends Component {
    constructor(){
        super();
        this.state = {
            listingsId : [],
            length: 1
        }
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.filteredListings!=null){//when calling this.addtofav component receive props, idkw
        this.setState({listingsId:nextProps.filteredListings});
      }
      
    }

    componentDidMount(){
        this.fetchListings();
    }

    //fetch random Listings
    fetchListings = () => {
      const filterListings = this.props.filteredListings;

      this.setState({listingsId: filterListings})

      
    }

    deleteFav = (itemId) => {
      const data = {
        userId : this.props.auth.user.id,
        listingId: itemId,
        favoritesArray: this.props.auth.user.favorites //interesante, talvez el dispatch estaba mal
      }
      console.log({mandandoData: data})

      this.props.addListingToFav(data)
      .then(res=> console.log(this.state))
      //esto lo arregla pero cambia el array
      
    }

  render() {
    const edit = this.props.edit;
    return (
      <div class="container-fluid ">
      
      {this.state.length==0 ? <h3>"No existen coincidencias"</h3> : this.state.listingsId?.map((item,i) => {

                  return <div class="rounded border p-4 m-3" key={i} style={{border: "2px solid #556b2f"}}>
                <div class="row">
                  <div class="col-md-8">
                    <Link to={`/listados/pagina/${item._id}`} class="text-decoration-none">
                      <div class="row">
                        <div class="col-4">
                          {item.images && item.images[0] ? <img class="img-fluid img-thumbnail" src={`${item.images[0]}`}/> : null}
                        </div>
                        <div class="col-6">
                          <h3 class="text-dark">{item.title}</h3>
                          <h4 class="text-dark">${item.price}</h4>
                          <p class="text-body">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                <div class="col-md-2">
                  <button type="button" onClick={()=>{alert('Esta función no está disponible')}} class= "btn btn-primary">
                  Eliminar de Favoritos
                  </button>
                </div>
              </div>
              </div>
            
                }
      )}
      </div>
     
    )
  }
}

const WrapperListingList = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <ListingList
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )
}

ListingList.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {addListingToFav}
)(WrapperListingList);
