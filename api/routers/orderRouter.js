import express from "express";
import orderController from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.get("/", orderController.home);
orderRouter.post("/oneWayOrder", orderController.oneWayOrder);
orderRouter.post("/estimateOrder", orderController.estimateOrder);

export default orderRouter;
