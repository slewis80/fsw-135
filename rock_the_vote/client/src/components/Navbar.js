import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    const { logout, token } = props

    return (
        <div className="navbar">
            <Link to="/">Home Page</Link>
            {token && <Link to="/profile">Profile</Link>}
            <Link to="/issues">Issues</Link>
            {token && <Link to="/mystuff">Mystuff</Link>}
            {token && <Link to="/" onClick={logout}>Logout</Link>}
        </div>
    )
}