import React from 'react'
import CommentsList from './CommentsList.js'

export default function Issue(props) {

    return (
        <div className="issueContainer">
            <h1>{props.title}</h1>
            <h3>Posted on {props.postDate} by {props.user.username}</h3>
            <p>{props.description}</p>
            <span>Upvote</span><span>{props.upvotes}</span><span>Downvote</span><span>{props.downvotes}</span>
            <hr/>
            <h3>Comment...</h3>
            {/* <CommentsList comments={props.comment}/> */}

        </div>
    )
}