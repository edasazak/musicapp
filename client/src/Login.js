import React from 'react'
import {Container, Button, Card, Form} from 'react-bootstrap'
import { signInWithGoogle } from './firebase'
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import {useNavigate} from 'react-router-dom'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=944d1d8fcf694089aa6b1c488dcdb067&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


export default function Login() {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then((success) => {
            let user = success.user;
            const obj = {
                username : user.displayName,
                email:user.email,
            }
            console.log(obj)
            navigate('/')
        })
    }
   
    return (
        
        <Card className="bg-dark text-white align-items-center
        text-center">
           
        <Card.Header as="h5" className=" mb-5" style ={{fontFamily:'Verdana'}}>Music Streaming App</Card.Header>
       <Card.Body>
        <Card.Body style={{ width: '18rem' }}>
        <Form.Control
            placeholder="E-mail"
        />
        <p></p>
        <Form.Control
            placeholder="Password"
        />
       
                <Button className= "mt-2">Login</Button>
     
        </Card.Body>
        <Container className="mt-5" style={{ minHeight: "87vh" }}>
       
        <Container >
            
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Login With Spotify</a>
        </Container>
        <p></p>
        <Container>
                <Button  onClick={signInWithGoogle}>Login with Google</Button>
        </Container>
        </Container>   
        </Card.Body>
        </Card>
       
    )
}
//className="d-flex justify-content-center align-items-center mt-3"
let styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#45494D'
    },
    title: {
        textAlign: 'center',
        marginTop: 16
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center'
    }
}