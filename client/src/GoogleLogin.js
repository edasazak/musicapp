import React from 'react'
import { signInWithGoogle } from './firebase';
import {Container, Button} from 'react-bootstrap'
import Dashboard from './Dashboard'
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function GoogleLogin() {
   
 const [isUserSignedIn, setUserSignedIn] = useState(true);
  firebase.auth().onAuthStateChanged((user)=>{
    if (user){
      return setUserSignedIn(true)
    }
    setUserSignedIn = (false)
  })
  if(isUserSignedIn===true) {
    return(
   
      <Routes>
   
    <Route path="/dashboard"
            element = {<Dashboard />}/>
  </Routes> 

      
    )
  }
  else{
    return(
      <Routes>
    
        <Route path="/" element={<Login/>}/>
       
      </Routes>
    )
  }

    }

    //     const [user, setUser] = useState({});
    //     const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    //   const handleGoogleSign = () => {
    //     signInWithPopup(auth, provider).then((res) => {
    //       setUser(res.user);
    //     });
    //   };
    
export default GoogleLogin;
