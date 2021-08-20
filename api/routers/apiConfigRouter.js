import express from 'express'

import apiConfigController from '../controllers/apiConfigController.js'

const apiConfigRouter = express.Router()

apiConfigRouter.get('/getDependencies', (req, res) => apiConfigController.getDependencies(req, res))

export default apiConfigRouter
