import React, { useState, useEffect } from 'react'
import axios from 'axios'
import IssuesList from './IssuesList'



export default function IssuesPage(props) {
    const { userAxios } = props

    const [issues, setIssues] = useState([])

    useEffect(() => {
        axios.get("/publicIssues")
            .then(res => {
                let data = res.data
                data.sort((a, b) => (a.upvotes > b.upvotes) ? 1 : (a.upvotes === b.upvotes) ? ((a.postDate > b.postDate) ? 1 : -1) : -1 )
                setIssues(data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }, [])

    return (
        <div className="container">
            <h1>Issues</h1>
            <IssuesList issues={issues} userAxios={userAxios} />
        </div>
    )
}