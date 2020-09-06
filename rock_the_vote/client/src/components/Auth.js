import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'

const initInputs = {
    username: "",
    password: ""
}


export default function Auth() {

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))  
    }
    
    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)        
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }
    
    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div className="container">
            <h1>Rock The Vote</h1>
            {!toggle ?
                <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnTxt="Sign Up"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Already A Member?</p>
                </>
            :
                <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnTxt="Log In"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Not A Member?</p>
                </>
            }
        </div>
    )
}