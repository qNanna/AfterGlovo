import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', (req, res, next) => userController.createUser(req, res, next));
userRouter.post('/login', (req, res, next) => userController.login(req, res, next));
export default userRouter;
