import React, { useState } from 'react'
// import CommentsList from './CommentsList.js'

export default function Issue(props) {
    const { userAxios } = props

    // state
    const initState = {
        upvotes: props.upvotes || 0,
        downvotes: props.downvotes || 0,
        comments: []
    }

    const [issueState, setIssueState] = useState(initState)
    
    const [comment, setComment] = useState("")


    function handleChange(e) {
        const {name, value} = e.target
        setComment(prevState => ({
            ...prevState,
            [name]: value
        }))  
    }


    function addUpvote(e) {
        e.preventDefault()
        setIssueState(prevIssueState => ({
            ...prevIssueState,
            upvotes: prevIssueState.upvotes + 1
        }))
        const issueId = e.target.parentNode.id
        userAxios.put(`/api/issues/upvote/${issueId}`, issueState)
            .then(res => console.log(res.data.upvotes))
            .catch(err => console.log(err.response.data.errMsg))
    }


    function addDownvote(e) {
        e.preventDefault()
        setIssueState(prevIssueState => ({
            ...prevIssueState,
            downvotes: prevIssueState.downvotes + 1
        }))
        const issueId = e.target.parentNode.id
        userAxios.put(`/api/issues/downvote/${issueId}`, issueState)
            .then(res => console.log(res.data.downvotes))
            .catch(err => console.log(err.response.data.errMsg))
    }


    function handleComment(e) {
        e.preventDefault()
        const issueId = e.target.parentNode.id
        addComment(comment, issueId)
        setComment("")
    }

    function addComment(newComment, issueId) {
        newComment.issue = issueId
        userAxios.post("/api/comments", newComment)
        .then(res => {
            setIssueState(prevIssueState => ({
                ...prevIssueState,
                comments: [...prevIssueState.comments, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }



    return (
        <div className="issueContainer" id={props._id}>
            <h1>{props.title}</h1>
            <p>Posted by: <span id="usernameOnIssue">{props.user.username}</span>{props.postDate}</p>
            <p className="issuePostContent">{props.description}</p>
            <button onClick={addUpvote}>Upvote</button>
            <span className="issuePostContent">{issueState.upvotes}</span>
            <button onClick={addDownvote}>Downvote</button>
            <span className="issuePostContent">{issueState.downvotes}</span>
            <hr/>
            <input onChange={handleChange} 
                name="comment" 
                value={comment} 
                type="text"
                placeholder="New Comment...">
            </input>
            <button onClick={handleComment}>Comment</button>
            {/* <CommentsList comments={props.comment}/> */}

        </div>
    )
}