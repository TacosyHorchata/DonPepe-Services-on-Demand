import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {setCurrentUser, logoutUser} from '../actions/authActions';


import {Provider} from 'react-redux';
import {store, persistor} from '../store';
import {PersistGate} from 'redux-persist/integration/react';


import Login from './Users/Login'
import Register from './Users/Register';
import Landing from './Landing.js';
import Header from './Header.js';
import MiCuenta from './Users/MiCuenta';
import PublicarAnuncio from './Listings/PublicarAnuncio';


import PrivateRoute from './Users/PrivateRoute';
import PublicRoute from './Users/PublicRoute';
import NotAllowed from './Users/NotAllowed';

import ListingTemplate from './Listings/ListingTemplate';
import UserProfile from './Users/UserProfile';
import FilterListings from './Listings/FilterListings';
import FilterCategory from './Listings/FilterCategory';
import EditListing from './Listings/EditListing';
import Footer from './Footer';
import FilterFavoriteListings from './Listings/FilterFavoriteListings';
import PublicProfile from './Users/PublicProfile';




if (localStorage.jwtToken){
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user info and exp
  const decoded = jwt_decode(token);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token 
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime){
      //logout user
      store.dispatch(logoutUser());

      //redirect to login
      window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Header/>
            <Routes> 
                  
              <Route path="/" element={<Landing/>} exact/>
              <Route 
                path="/listados/pagina/:id" 
                element ={
                    <ListingTemplate/>
                }/>
              <Route 
                path="/:searchQuery/search" 
                element ={
                    <FilterListings/>
                }/>

                <Route 
                path="/category/:categoryName" 
                element ={
                    <FilterCategory/>
                }/>
              
                <Route 
                path="/category/:categoryName/:subcategoryName" 
                element ={
                    <FilterCategory/>
                }/>
              
                
                <Route 
                path="/listados/:userId/:listingId/update" 
                element={
                  <PrivateRoute>
                    <EditListing/>
                  </PrivateRoute>
                }
                />
                <Route 
                path="/user/:id/profile" 
                element ={
                    <PublicProfile/>
                }/>
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login/>
                  </PublicRoute>
                }
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register/>
                  </PublicRoute>
                }
              />
              <Route 
                path="/micuenta/:userId" 
                element={
                  <PrivateRoute>
                    <MiCuenta/>
                  </PrivateRoute>
                }
              />

              <Route 
                path="/micuenta/:userId/favorites" 
                element ={
                  <PrivateRoute>
                    <FilterFavoriteListings/>
                </PrivateRoute>
                }/>

              <Route 
                path="/notAllowed" 
                element={
                    <NotAllowed/>
                }
              />
              <Route 
                path="/publicar" 
                element={
                  <PrivateRoute>
                    <PublicarAnuncio/>
                  </PrivateRoute>
                }
              />

          
            </Routes>      
            <Footer/>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
