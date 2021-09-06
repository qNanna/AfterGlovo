import express from 'express';

import { errorRoute, errorHandler } from './middlewares/errorHandler';
import auth from './middlewares/authMiddleware';
import orderRouter from './routers/orderRouter';
import serviceRouter from './routers/serviceRouter';
import userRouter from './routers/userRouter';

const api = express.Router();

api.get('/health', (req, res) => {
  res.json({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toLocaleString(),
  });
});
api.use('/v1/orders', auth, orderRouter);
api.use('/v1/users', userRouter);
api.use('/service', serviceRouter);
api.use(errorRoute, errorHandler);

export default api;
