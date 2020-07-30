const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// middleware
app.use(express.json())
app.use(morgan('dev'))

// db connect
mongoose.connect('mongodb://localhost:27017/e-commerce-db', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the database")
    )

// routes
app.use("/inventory", require("./routes/inventoryRouter.js"))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// listen
app.listen(7000, ()=> console.log("Server is running on Port 7000"))
