const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

// middleware
app.use(express.json())
app.use(morgan('dev'))

// DB connect
mongoose.connect('mongodb://localhost:27017/rock_the_vote',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the Database...')
)

// routes
app.use("/auth", require('./routes/authRouter.js'))
app.use("/publicIssues", require('./routes/publicIssueRouter.js'))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/issues", require('./routes/issueRouter.js'))
app.use("/api/comments", require('./routes/commentRouter.js'))


// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// listen
app.listen(9000, () => console.log('Server is running on Port 9000'))