import React, { useState, useEffect } from 'react'
import IssuesList from './IssuesList.js'

export default function MyStuff(props) {
    const { userAxios } = props

    const [userIssues, setUserIssues] = useState([])

    useEffect(() => {
        // function getUserIssues() {
            userAxios.get("/api/issues/user")
                .then(res => {
                    setUserIssues(res.data)
                })
                .catch(err => console.log(err.response.data.errMsg))    
    }, [])

    return (
        <div className="container">
            <h1>My Stuff</h1>
            <IssuesList issues={userIssues} userAxios={userAxios} />
        </div>
    )
}