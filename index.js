const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const orderRouter = require('./app/routers/orderRouter.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public')) // think not need
app.use('/', orderRouter)

const PORT  = process.env.PORT || 3051
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))
