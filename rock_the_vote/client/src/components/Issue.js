import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import thumbsup from '../images/thumbsup.png'
import thumbsdown from '../images/thumbsdown.png'
import { UserContext } from '../context/UserProvider.js'
import CommentsList from './CommentsList.js'
import axios from 'axios'

export default function Issue(props) {
    const { user: { _id }
    } = useContext(UserContext)

    const { userAxios } = props

    // state
    const initState = {
        _id: props._id || 0,
        upvotes: props.upvotes || 0,
        downvotes: props.downvotes || 0,
        usersVoted: props.usersVoted || [],
        comments: [],
        user: { 
            _id: props.user._id || ""
        }, 
        errMsg: ""
    }

    const initCommentState = {
        comment: ""
    }

    const [issueState, setIssueState] = useState(initState)

    const [commentState, setCommentState] = useState(initCommentState)
    

    function handleChange(e) {
        const {name, value} = e.target
        console.log(commentState.comment)
        setCommentState(prevCommentState => ({
            ...prevCommentState,
            [name]: value
        }))  
    }

    function handleErr(errMsg){
        setIssueState(prevIssueState => ({
            ...prevIssueState,
            errMsg
        }))
    }


// upvotes
    function addUpvote(e) {
        e.preventDefault()
        checkIfVoted()
        if(issueState.user.hasVoted){
            handleErr(`You have already voted on this issue`)
        } else if(issueState.user === ""){
            handleErr(`You must be logged in to vote`)
        } else {
            userAxios.put(`/api/issues/upvote/${issueState._id}`)
                .then(res => {
                    setIssueState(prevIssueState => ({
                        ...prevIssueState,
                        upvotes: prevIssueState.upvotes + 1, 
                        user: {hasVoted: true}
                    }))
                })
                .catch(err => handleErr(err.response.data.errMsg))
            }
    }

// downvotes
    function addDownvote(e) {
        e.preventDefault()
        checkIfVoted()
        if(issueState.user.hasVoted){
            handleErr(`You have already voted on this issue`)
        } else if(issueState.user === ""){
            handleErr(`You must be logged in to vote`)
        } else {
            userAxios.put(`/api/issues/downvote/${issueState._id}`, issueState)
                .then(res => {
                    setIssueState(prevIssueState => ({
                        ...prevIssueState,
                        downvotes: prevIssueState.downvotes + 1,
                        user: {hasVoted: true}
                    }))
                })
                .catch(err => handleErr(err.response.data.errMsg))
            }
    }

    function checkIfVoted() {
        const voted = issueState.usersVoted.includes(issueState.user._id)
        if(voted){
            setIssueState(prevIssueState => ({
                ...prevIssueState,
                user: {hasVoted: true}
            }))
        }
    }


// comments
    function handleComment(e) {
        e.preventDefault()
        addComment(commentState)
    }

    function addComment(comment) {
        const issueId = issueState._id
        console.log(comment)
        userAxios.post(`/api/comments/${issueId}`, comment)
        .then(res => {
            console.log(res.data)
            setIssueState(prevIssueState => ({
                ...prevIssueState,
                comments: [...prevIssueState.comments, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))

        setCommentState(initCommentState)

    }

    useEffect(() => {
        axios.get(`/publicIssues/comments/${issueState._id}`)
            .then(res => {
                setIssueState(prevIssueState => ({
                    ...prevIssueState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }, [])




    return (
        <div className="issueContainer" id={props._id}>
            <h1>{props.title}</h1>
            <p>Posted by: <span><Link to="issuesbyuser" id="usernameOnIssue" params={{user: props.user}}>{props.user.username}</Link></span>{props.postDate}</p>
            <p className="issuePostContent">{props.description}</p>
            <button onClick={addUpvote}><img src={thumbsup} /></button>
            <span className="issuePostContent">{issueState.upvotes}</span>
            <button onClick={addDownvote}><img src={thumbsdown} /></button>
            <span className="issuePostContent">{issueState.downvotes}</span>

            {/* error section */}
            <hr/>
            <p style={{color: "red"}}>{issueState.errMsg}</p>

            {/* comments */}
            <form onSubmit={handleComment}>
            <input onChange={handleChange} 
                name="comment" 
                value={commentState.comment} 
                type="text"
                placeholder="New Comment...">
            </input>
            <button onClick={handleComment}>Comment</button>
            </form>
            <CommentsList comments={issueState.comments}/>
        </div>
    )
}