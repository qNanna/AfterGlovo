import express from 'express';

import orderController from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/oneWay', (req, res) => orderController.oneWay(req, res));
orderRouter.post('/estimate', (req, res, next) => orderController.estimate(req, res, next));

export default orderRouter;
