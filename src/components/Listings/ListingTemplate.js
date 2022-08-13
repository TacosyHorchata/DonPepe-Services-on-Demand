import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';




class ListingTemplate extends Component {
  constructor(){
      super();
    this.state={
      listingId: "",
      title: "",
      description: "",
      price: "",
      category: "",
      subcategory:"",
      country: "",
      stateName: "",
      city: "",
      images:[],
      userId:"",
      errors: {}
    }


  }


  componentDidMount(){
    this.fetchListingInfo();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  fetchListingInfo= () => {
    fetch(`/api/listados/${this.props.params.id}/getInfo`)
    .then(res=> res.json())
    .then(data=> {this.setState
      ({...this.state,
        listingId:data._id,
        title: data.title,
        description: data.description,
        price: data.price,
       // img: data.img,
        category: data.category,
        subcategory: data.subcategory,
        country: data.country,
        stateName: data.location.stateName,
        city: data.location.city,
        images: data.images,
        userId: data.userID     
      });
      console.log(this.state);
    })
  }

  render() {
    return (
      <div class="container-fluid">

      <div name="title" class="">
          <h1>{this.state.title}</h1>
      </div>

       {this.state.images[1] ? (
          <Carousel>
              {/*<Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>*/}
              {this.state.images.map((item,i)=>{
                return <Carousel.Item interval={5000}>
                    <img
                      class="d-block w-100 img-fluid"
                      style={{maxHeight:'70%'}}
                      src={`${item}`}
                      alt={`${i} slide`}
                    />
                  </Carousel.Item>
              })}
          </Carousel>
    ): (
      <img style={{maxHeight:'70%'}} class="d-block w-100 img-fluid" src={`${this.state.images[0]}`}/>
      )}

      <div class="h-25 d-block border-top" name="price" >
            <h2>${this.state.price}</h2> 
      </div>

      <div>
        <div class="h-25 d-block border-top overflow-auto" name="description">
          <p>{this.state.description}</p>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>


        <div class="h-25 d-block border-top" name="others" >
          <p>Categorías: {this.state.category}{'>> '}{this.state.subcategory} </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    
    
    </div>
      
     
    )
  }
}

const WrapperListingTemplate = props => {
  const navigate = useNavigate();
  const params = useParams();
  /*que pasa aqui?
  Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
  useNavigate solo se puede usar en componentes funciones por ser un Hook*/
  return (
      <ListingTemplate
      navigate = {navigate}
      params = {params}
      {...props}
      />
  )

}

ListingTemplate.propTypes = {
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
)(WrapperListingTemplate);

