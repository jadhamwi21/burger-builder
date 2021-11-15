import { Router } from "express";
import {
	cancel_order,
	create_order,
	deliver_order,
	get_all_orders,
	get_my_orders,
	order_in_cook,
	subscribe,
} from "../controllers/orderController";
import { authorization } from "../middlewares/authorization";

export const orderRouter = Router();

orderRouter.post("/create", authorization, create_order);

orderRouter.get("/my", authorization, get_my_orders);

orderRouter.put("/cancel", authorization, cancel_order);

orderRouter.put("/in_cook", authorization, order_in_cook);

orderRouter.get("/get_all", authorization, get_all_orders);

orderRouter.post("/subscribe", authorization, subscribe);

orderRouter.put("/deliver", authorization, deliver_order);
