import React, { useState } from 'react'
import axios from 'axios'

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props) {

    const initCommentState = {
        comments: []
    }


    const [commentState, setCommentState] = useState(initCommentState)


    function addComment(newComment) {
        userAxios.post("/api/comments", newComment)
        .then(res => {
            setCommentState(prevState => ({
                comments: [...prevState.comments, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }


    return(
        <IssueContext.Provider
            value={{
                ...commentState,
                addComment
            }}>
            {props.children}
        </IssueContext.Provider>
    )
}

