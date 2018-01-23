import React from 'react'
import brand from './spotify-logo.png'

function Login() {
    return <div className="login">
    <img src={brand} alt="brand" />
    <h1><a className="btn-login" href="http://localhost:3001/login">Login</a> to spotify</h1>
    
    </div>
}

export default Login
