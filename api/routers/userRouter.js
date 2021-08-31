import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', (req, res, next) => userController.createUser(req, res, next));

export default userRouter;
