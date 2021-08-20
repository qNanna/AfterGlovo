import config from './config/index.js'
import chalk from 'chalk'
import express from 'express'

import api from './api/index.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', api)

app.listen(config.port, config.host, () => console.info(chalk.green(`Server has started on ${config.host}:${config.port}`)))
