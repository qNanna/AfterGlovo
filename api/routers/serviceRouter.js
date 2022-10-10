import express from 'express';

import serviceController from '../controllers/serviceController';

const apiConfigRouter = express.Router();

apiConfigRouter.get('/dependencies', (req, res) => serviceController.getDevDependencies(req, res));

export default apiConfigRouter;
