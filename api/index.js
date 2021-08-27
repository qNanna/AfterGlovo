import express from 'express';

import { errorRoute, errorHandler } from './middlewares/errorHandler';
import orderRouter from './routers/orderRouter';
import serviceRouter from './routers/serviceRouter';
import userRouter from './routers/userRouter';

const api = express.Router();

api.use('/v1/orders', orderRouter);
api.use('/v1/users', userRouter);
api.use('/service', serviceRouter);
api.use(errorRoute, errorHandler);

export default api;
