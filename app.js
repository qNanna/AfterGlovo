import chalk from 'chalk'
import express from 'express'

import api from './api/index.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', api)

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3051
app.listen(PORT, HOST, () => console.info(chalk.green(`Server has started on ${HOST}:${PORT}`)))
