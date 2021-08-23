import express from 'express';

import orderRouter from './routers/orderRouter';
import serviceRouter from './routers/serviceRouter';

const api = express.Router();

api.use('/v1/orders', orderRouter);
api.use('/dependencies', serviceRouter);
export default api;
