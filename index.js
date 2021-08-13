const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const orderRouter = require('./app/routers/orderRouter.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', './app/views');
app.set('view engine', 'ejs')

app.use(express.static('public')) 
app.use('/', orderRouter)

const PORT  = process.env.PORT || 3051
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))
