import config from './config'
import chalk from 'chalk'
import express from 'express'

import api from './api'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', api)

const HOST = config.host
const PORT = config.port
app.listen(PORT, HOST, () => console.info(chalk.green(`Server has started on ${HOST}:${PORT}`)))
