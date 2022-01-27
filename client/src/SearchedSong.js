import React from 'react'

export default function SearchedSong({track, chooseSong}) {
    function play(){
    chooseSong(track)
    }
    return (
        <div 
        onClick={play}
        
        >
         <img src = {track.album_url} style = {{height:"70px", width:"70px", flexDirection:'row'}}/>
         <div style = {{color:'#FFFFFF', fontFamily:'Verdana'}}>{track.title} </div>
         <div style = {{color:'#FFFFFF', fontFamily:'Verdana'}}>{track.artist}</div>
        </div>
    )
}
