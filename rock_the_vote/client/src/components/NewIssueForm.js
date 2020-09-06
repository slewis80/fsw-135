import React, { useState } from 'react'

const initInputs = {
    title: "",
    description: ""
}


export default function NewIssueForm(props) {
    const [inputs, setInputs] = useState(initInputs)

    const { addIssue } = props

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))  
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputs.title}
                name="title"
                onChange={handleChange}
                placeholder="Title" />
            <textarea 
                type="text"
                value={inputs.description}
                name="description"
                onChange={handleChange}
                placeholder="Description" />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}