import React, { Component } from 'react'
import ListingList from './Listings/ListingList'
import NavListados from './NavListados'


export default class Landing extends Component {
  
  render() {
    return (
      <div>
      
      {/* Navbar */} 
      <img class="w-100" src="https://firebasestorage.googleapis.com/v0/b/image-uploads-6e4c3.appspot.com/o/images%2Fbanner%20proera.png?alt=media&token=2cb70cab-cc72-4f5b-86ae-39e84be19e30"/>
      <NavListados/>
      <img class="w-100" src="https://firebasestorage.googleapis.com/v0/b/image-uploads-6e4c3.appspot.com/o/images%2F2%20banner.jpg?alt=media&token=4dfe8a57-7d67-4ec6-ac39-bcb7aad00791"/>
      <ListingList size={"5"}/>
      </div>
     
    )
  }
}

