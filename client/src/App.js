import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import GoogleLogin from './GoogleLogin';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { signInWithGoogle } from './firebase';
import {Container, Button} from 'react-bootstrap'
import { Navigate } from "react-router-dom";
const code = new URLSearchParams(window.location.search).get('code'); // url in kod kısmını alır.

function App() {

console.log(code);
  return (
    <div className="App">
    {code ? <Dashboard code = {code}/>: <Login/> }  
   <GoogleLogin></GoogleLogin>
  </div>
  ); 
}
//   {/* display code on dashboard screen */}
//   <Routes>
        
//   <Route path="login" element={<Dashboard/>}/>
// </Routes>

export default App

