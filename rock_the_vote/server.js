const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

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
app.use("/", require('./routes/authRouter.js'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// listen
app.listen(9000, () => console.log('Server is running on Port 9000'))