import express from 'express'
import dotenv from 'dotenv'
import api from './api/index.js'

const app = express()

dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))
app.use('/api', api)

const PORT = process.env.PORT || 3051
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
