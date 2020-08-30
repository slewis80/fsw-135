import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import NewIssueForm from './NewIssueForm.js'


export default function Profile(props) {

    const { user: { username }, 
        addIssue
    } = useContext(UserContext)


    return (
        <div className="container">
            <h1>Welcome {username}</h1>
            <hr/>
            <h2>Add a new post...</h2>
            <NewIssueForm
                addIssue={addIssue}/>
        </div>
    )
}