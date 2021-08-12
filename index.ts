//import Router from 'koa-router';
const express = require('express');
const app = express();
const router = require('./app/router.ts')

router.init(app)
app.use(express.static('public'))

const PORT  = process.env.PORT || 3051
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))

//https://api.glovoapp.com.

