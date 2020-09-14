import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar(props) {
    const { logout, token } = props

    return (
        <div className="navbar">
            {!token && <NavLink exact to="/"
                activeClassName="navbar__link--active"
                className="navbar__link">Home Page</NavLink>}
            {token && <NavLink to="/profile"
                activeClassName="navbar__link--active"
                className="navbar__link">Profile</NavLink>}
            <NavLink to="/issues"
                activeClassName="navbar__link--active"
                className="navbar__link">Issues</NavLink>
            {token && <NavLink to="/mystuff"
                activeClassName="navbar__link--active"
                className="navbar__link">Mystuff</NavLink>}
            {token && <NavLink to="/" 
                activeClassName="navbar__link--active"
                className="navbar__link" 
                onClick={logout}>Logout</NavLink>}
        </div>
    )
}