import React, { Component } from 'react'
import ListingList from './Listings/ListingList'
import NavListados from './NavListados'


export default class Landing extends Component {
  
  render() {
    return (
      <div>
      
      {/* Navbar */}
      <NavListados/>
      <ListingList size={"5"}/>
      </div>
     
    )
  }
}

