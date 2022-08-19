import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {addListingToFav} from '../../actions/authActions'

const SERVERLINK = process.env.REACT_APP_SERVERLINK;

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

        const numberOfRandomListings =  this.props.size;
        const filterListings = this.props.filteredListings;

        console.log({size: numberOfRandomListings, filterListings: filterListings})

        if(this.props.size){
          fetch(`${SERVERLINK}/api/listados/${numberOfRandomListings}/getRandomListing/`)
        .then(res => res.json())
        .then(data => {
            this.setState({...this.state, listingsId:data});
        })
        .catch(error => {
            if (error.name === 'AbortError') return
            // if the query has been aborted, do nothing
            throw error
          })
        }else if(this.props.filteredListings){
          this.setState({listingsId: filterListings})
          console.log({listingsId:this.state.listingsId + " ,length: " + this.state.length })
          /*if(filterListings.length==0){
            this.setState({...this.state,length:0})
            //si length 0,"no existen coinciencias"

            //esto caga las cosas al principio
          }*/
        }
    }

    addToFav = (itemId) => {
      const data = {
        userId : this.props.auth.user.id,
        listingId: itemId,
        favoritesArray: this.props.auth.user.favorites
      }
      console.log({mandandoData: data})

      this.props.addListingToFav(data)
      .then(res=> alert('Anuncio agregado a favoritos'))
      //esto lo arregla pero cambia el array
      
    }

  render() {
    const edit = this.props.edit;
    return (
      <div class="container-fluid ">
      
      {this.state.length==0 ? <h3>"No existen coincidencias"</h3> : this.state.listingsId?.map((item,i) => {
                if(item && edit=="yes"){
                  return <div class="rounded border p-4 m-3" key={i} >
                <Link to={`/listados/pagina/${item._id}`} class="text-decoration-none">
                  <div class="row">
                    <div class="col-4">
                      <img class="img-fluid img-thumbnail" style={{maxWidth:"100%"}} src={`${item.images[0]}`}/>
                    </div>
                    <div class="col-8">
                      <h5 class="text-dark">{item.title}</h5>
                    </div>
                  </div>
                </Link>
                <Link to={`/listados/${this.props.auth.user.id}/${item._id}/update`}>
                  <div class="d-grid gap-2 m-1">
                    <button class="btn btn-primary ">Editar Publicación</button>
                  </div>
                </Link>
                </div>
                }else if(item){

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
                  <button type="button" class= "btn btn-warning" onClick={()=>this.addToFav(item._id)}>
                  Agregar a favoritos
                  </button>
                </div>
              </div>
              </div>
            
                }
      })}
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
