import React from 'react'
import Issue from './Issue.js'

export default function IssuesList(props) {
    const { issues } = props

    const showIssue = issues.map(issue => <Issue {...issue} key={issue._id} />)


    return (
        <div className="issueList">
            {showIssue}
        </div>
    )
}