const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const querystring = require('querystring')
const cors = require('cors')

require('dotenv').config()

const server = express()
const PORT =  process.env.PORT

server.use(cors())
server.use(bodyParser.json())

server.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: 'http://localhost:3001/auth/spotify/callback'
    }))

})

server.get('/auth/spotify/callback', (req, res) => {
    const code = req.query.code || null
    const spotifyAPIRequest = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        params: {
            code: code,
            redirect_uri: "http://localhost:3001/callback",
            grant_type: 'authorization_code'
        }
    }

    axios(spotifyAPIRequest)
    .then(spotifyResponse => {
        const uri = 'http://localhost:3000/songs'

        // potentially you could save the access_token for reuse
        const access_token = spotifyResponse.data.access_token
        res.redirect(uri + '?access_token=' + access_token)
    })
    .catch(err => {
        res.json({error: err.message})
    })
})

server.listen(PORT, () => {
    console.info(`listening on port ${PORT}`)
})