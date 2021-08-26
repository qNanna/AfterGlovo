import express from 'express';

import orderRouter from './routers/orderRouter';
import serviceRouter from './routers/serviceRouter';
import userRouter from './routers/userRouter';

const api = express.Router();
// TODO: app.use midleware
api.use('/v1/orders', orderRouter);
api.use('/v1/users', userRouter);
api.use('/service', serviceRouter);
export default api;
