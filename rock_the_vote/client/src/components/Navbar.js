import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {

    return (
        <div className="navbar">
            <Link to="/profile">Profile</Link>
            <Link to="/issues">Issues</Link>
            <Link to="/mystuff">Mystuff</Link>
            <Link to="/" onClick={props.logout}>Logout</Link>
        </div>
    )
}