require("dotenv").config()
const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const SpotifyWebApi = require("spotify-web-api-node")
const lyricsFinder = require("lyrics-finder")
const app = express()
app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

 


var serviceAccount = require("/Users/mac/Downloads/login-6a7fa-firebase-adminsdk-vtq75-d65eff0085.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.post("/refresh", (req, res) => {
  const refresh_token = req.body.refresh_token
  const spotifyWebApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refresh_token,
  })

  spotifyWebApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        access_token: data.body.access_token,
        expires_in: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyWebApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyWebApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expires_in: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.get("/lyrics", async(req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "Şarkı Sözleri Bulunamadı"
  res.json({lyrics})
})
app.listen(8080)