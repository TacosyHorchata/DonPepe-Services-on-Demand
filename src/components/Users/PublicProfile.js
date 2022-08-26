
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { filterListings } from "../../actions/listadosActions";

import ListingList from "../Listings/ListingList";

const SERVERLINK = process.env.REACT_APP_SERVERLINK;

class UserProfile extends Component {
    constructor(){
        super();
      this.state={
        username: "",
        name: "",
        aboutMe:"",
        contact:"",
        location: {
          stateName: "",
          city: "",
          country: "",
      },
      userInfo: {
          profile_img: "",
          phone: "",
          description: "",
          reputation: "",
      },
      listings: [],
      }
  
  
    }
  
  
    componentDidMount(){
      this.fetchUserInfo();

      const data = {
        type: 'userID',
        query: this.props.params.id
      }
        this.props.filterListings(data)
        .then(res=>{
            this.setState({
                listings:this.props.listings.listings
            })
        })
    }
  
    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
  
    fetchUserInfo= () => {
      fetch(`${SERVERLINK}/api/users/${this.props.params.id}/userInfo`)
          .then(res => res.json())
          .then(data => {
          this.setState({...this.state, 
              name:data.name,
              userInfo:{description:data.userInfo.description} ,
              email:data.email,
              aboutMe:data.aboutMe,
              contact: data.contact,  
              location:{
                stateName:data.location.stateName,
                city: data.location.city
              } 
            });
  
            }
          )
          
          .catch(error => {
              if (error.name === 'AbortError') return
              // if the query has been aborted, do nothing
              throw error
            })
    }
  
    render() {
      return (
        <div>
            <div class="row py-5 px-4">
                <div class="col-xl-4 col-md-6 col-sm-10 mx-auto">
            
                
                    <div class="bg-white shadow rounded overflow-hidden">
                        <div class="p-4 bg-dark">
                            <div class="media align-items-end profile-header">
                                <div class="profile mr-3">
                                    {/*<img src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
                                  */}
                                    </div>
                                <div class="media-body mb-5 text-white">
                                    <h4 class="mt-0 mb-0">{this.state.name}</h4>
                                    <p class="small mb-4"> {this.state.location.city + ", " + this.state.location.stateName}</p>
                                    <p class="small mb-4"> Acerca de mi: <br/></p>
                                    <p class="small mb-4"> {this.state.aboutMe}</p>
                                </div>
                            </div>
                        </div>
            
                        <div class="bg-light p-4 d-flex text-center">
                            <h5>Contacto: </h5>
                            <p> {this.state.contact}</p>
                        </div>
            
                        <div class="py-4 px-4">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h5 class="mb-0">Servicios</h5>
                            </div>
                            <div class="row">
                                {this.state.listings?.map((item, key) => {
                                    return <div class="col-lg-6 mb-2 pr-lg-1"><img src={`${item.images[0]}`} alt="" class="img-fluid rounded shadow-sm"/></div>
                                })
                            }
                                
                            </div>
                            {/*<div class="py-4">
                                <h5 class="mb-3">Reseñas</h5>
                                <div class="p-4 bg-light rounded shadow-sm">
                                    <p class="font-italic mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                    <ul class="list-inline small text-muted mt-3 mb-0">
                                        <li class="list-inline-item"><i class="fa fa-comment-o mr-2"></i>12 Comments</li>
                                        <li class="list-inline-item"><i class="fa fa-heart-o mr-2"></i>200 Likes</li>
                                    </ul>
                                </div>
                          </div>*/}
                        </div>
                    </div>
            
                </div>
            </div>
    
        </div>
       
      )
    }
  }
  
  const WrapperUserProfile = props => {
    const navigate = useNavigate();
    const params = useParams();
    /*que pasa aqui?
    Edit: daba error por que en react-router v6 no existe withRouter nor useHistory y 
    useNavigate solo se puede usar en componentes funciones por ser un Hook*/
    return (
        <UserProfile
        navigate = {navigate}
        params = {params}
        {...props}
        />
    )
  
  }
  
  UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
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
  )(WrapperUserProfile);
  
  