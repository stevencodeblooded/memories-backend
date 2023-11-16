const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const memoriesRoutes = require('./routes/memories-routes') 

const app = express()
app.use(bodyParser.json({ limit:'30mb', extended:true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true }))
app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use('/api/memories', memoriesRoutes)

mongoose
    .connect("mongodb+srv://coding_genius:SDwBWoFys6huK9vD@cluster0.p3mcyyf.mongodb.net/crud-test?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err);
    })
