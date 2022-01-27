import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
export default function SongPlayer({access_token, track_uri}) { // burada çalmak istediğimiz şarkıların uri'larını belirliyoruz
    if(!access_token) return null
    return (
    <SpotifyPlayer 
    token = {access_token}
    uris = {track_uri ? [track_uri] : []} //çalınacak bir şarkı var mı onu kontrol ediyor eğer yoksa boş array dönderiyor
    /> 
    )  
    
}
