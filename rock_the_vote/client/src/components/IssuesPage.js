import React, { useState, useEffect } from 'react'
import axios from 'axios'
import IssuesList from './IssuesList'



export default function IssuesPage(props) {
    const { userAxios } = props

    const [issues, setIssues] = useState([])

    useEffect(() => {
        axios.get("/publicIssues")
            .then(res => {
                setIssues(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }, [])

    return (
        <div className="container">
            <h1>Issues</h1>
            <p>This page lists of all the issues for the site, with the highest upvotes showing first. 
                <br/>
                As a registered user, you can vote or comment on any post or create a post of your own!</p>
            <IssuesList issues={issues} userAxios={userAxios} />
        </div>
    )
}