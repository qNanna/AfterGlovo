import orderRouter from "./routers/orderRouter.js";
import express from "express";
const api = express.Router();

api.use("/v1/orders", orderRouter);

export default api;
