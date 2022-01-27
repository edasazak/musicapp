import React, { useState, useEffect } from 'react'
import useAuth from './Auth'
import {Card, Container, Form, Button,Row,Col} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import SearchedSong from './SearchedSong'
import SongPlayer from './SongPlayer'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const spotifyWebApi = new SpotifyWebApi({
    client_id: '944d1d8fcf694089aa6b1c488dcdb067'
})

export default function Dashboard({code}) {
    const access_token = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchFindings, setSearchFindings] = useState([])
    const [playingSong, setPlayingSong] = useState()
    const [lyrics, setLyrics] = useState("")
    const navigate = useNavigate();
    const logout = () => {
        navigate('/dashboard')
    }
    function chooseSong(track) {
        setPlayingSong(track)
        setSearch('')
        setLyrics('')
    }
    useEffect(() => {
        if(!access_token) return
        spotifyWebApi.setAccessToken(access_token)
    }, [access_token])
    useEffect(() =>{
        if(!search) return setSearchFindings([])
        if(!access_token) return
        spotifyWebApi.searchTracks(search).then(res =>{
            setSearchFindings(res.body.tracks.items.map(track =>{
                const albumImage = track.album.images.at((image) => {
                    return image
                },track.album.images[0])
                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    album_url: albumImage.url
                }
            }))
        })
    }, [search, access_token])
    useEffect(() => {
        if(!playingSong) return 
        axios.get('http://localhost:8080/lyrics', {
            params: {
                track: playingSong.title,
                artist: playingSong.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    },[playingSong])
    return (
        <Card className="bg-dark text-white">
            <Container style={{ minHeight: "90vh" }}>
       <Container style={{ width: '40rem', marginTop:'16px'}} className="d-flex">
           <Container>
        <Form.Control
            type = "search"
            placeholder = "Search Songs/Artists/Albums..."
            value = {search}
            onChange = {e => {setSearch(e.target.value)}}
        />
        </Container>
        <Container className="d-flex justify-content-xxl-end ml-5">
        <Row className="align-items-end">
        <Col style={{display:'flex', justifyContent:'right'}}>
        <Button className="d-flex justify-content-between" onClick={logout}>Logout</Button>
        </Col>
        </Row>
        </Container>
        </Container>
        <p></p>
        <div>
            {searchFindings.map(track => (
                <SearchedSong track = {track} key = {track.uri} chooseSong = {chooseSong}/>
            ))}
            </div>
            {searchFindings.length === 0 && (
                <div  style={{whiteSpace: "pre", color:'#FFFFFF', fontFamily:'Verdana'}}>
                    {lyrics}
                </div>
            )}
            <div><SongPlayer access_token = {access_token} track_uri = {playingSong?.uri}/></div> 
            </Container>
        </Card>
    )
}
