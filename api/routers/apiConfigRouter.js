import express from 'express'

import apiConfigController from '../controllers/apiConfigController.js'

const apiConfigRouter = express.Router()

apiConfigRouter.get('/getDependencies', (req, res) => apiConfigController.getDependencies(req, res))
// apiConfigRouter.get('/setVariables', (req, res) => res.json({ status: 'Done' }))

export default apiConfigRouter
