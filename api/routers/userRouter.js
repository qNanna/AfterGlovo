import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', (req, res, next) => userController.createUser(req, res, next));
userRouter.post('/signIn', (req, res, next) => userController.login(req, res, next));
userRouter.post('/refreshToken', (req, res, next) => userController.refreshToken(req, res, next));
userRouter.get('/', (req, res, next) => userController.getUser(req, res, next));

export default userRouter;
