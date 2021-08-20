import express from 'express'

import utils from '../../utils/index.js'

const apiConfigRouter = express.Router()

apiConfigRouter.get('/getDependencies', (req, res) => {
  const data = utils.readFile('./package.json')
  res.send(Object.keys(data.dependencies))
})

export default apiConfigRouter
