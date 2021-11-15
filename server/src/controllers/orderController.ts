import { Request, Response } from "express";
import { Database } from "../models";
import { Burger } from "../types/types";
import {
	CreateOrderInDatabase,
	GetAllOrders,
	GetUserOrders,
} from "../helpers/functions";
import { OrdersSubjectInstance } from "../Observer/Subject";
import { NotifyEnum } from "../Observer/types";
import { Server } from "../../node_modules/socket.io/dist";
import { DefaultEventsMap } from "../../node_modules/socket.io/dist/typed-events";

export const create_order = async (req: Request, res: Response) => {
	if (req.User.Role === "customer") {
		if (req.User.isVerified) {
			const {
				orderName,
				orderAddres,
				Burgers,
			}: {
				orderName: string;
				orderAddres: string;
				Burgers: Burger[];
			} = req.body;
			await CreateOrderInDatabase(orderName, orderAddres, Burgers, req.User.Id);
			return res.status(200).json({ message: "order created" }).end();
		} else {
			return res
				.status(403)
				.json({
					message: "email is not verified, make sure to verify your email",
				})
				.end();
		}
	} else {
		return res
			.status(403)
			.json({ message: "You're not authorized to access this route" });
	}
};

export const get_my_orders = async (req: Request, res: Response) => {
	if (req.User.Role === "customer") {
		const userId = req.User.Id;
		const Orders = await GetUserOrders(userId);
		return res
			.status(200)
			.json({
				Orders: Orders.filter((Order) => Order.OrderStatus !== "cancelled"),
			})
			.end();
	} else {
		return res
			.status(403)
			.json({ message: "you're not allowed to access this route" });
	}
};

export const cancel_order = async (req: Request, res: Response) => {
	if (req.User.Role === "customer") {
		const { orderId } = req.body;
		const { order_status }: any = await Database.Order.findOne({
			where: { id: orderId },
			raw: true,
		});
		if (order_status === "in cook") {
			return res
				.status(400)
				.send({ error: "you can't cancel order if it's in process" });
		}
		OrdersSubjectInstance.notifyAll({
			type: NotifyEnum.OrderStatusUpdate,
			orderId,
			orderStatus: "cancelled",
		});

		Database.Order.update(
			{
				order_status: "cancelled",
			},
			{
				where: {
					id: orderId,
				},
			}
		)
			.then(() => {
				res.status(200).json({ message: "Order Cancelled" }).end();
			})
			.catch(() => {
				res
					.status(500)
					.json({ message: "Order With This Id Doesn't Exist" })
					.end();
			});
	} else {
		res
			.status(403)
			.json({ message: "you're not allowed to cancel orders" })
			.end();
	}
};

export const get_all_orders = async (req: Request, res: Response) => {
	if (req.User.Role === "admin") {
		const Orders = await GetAllOrders();
		res.status(200).json(Orders).end();
	} else {
		res
			.status(403)
			.json({ error: "you're not allowed to get orders of all customers" })
			.end();
	}
};

export const subscribe = (req: Request, res: Response) => {
	if (req.User.Role === "admin") {
		res
			.status(200)
			.json({ message: "you're allowed to register to orders listener" });
	} else {
		res.status(403).json({ error: "unauthorized as admin" });
	}
};

export const deliver_order = async (req: Request, res: Response) => {
	if (req.User.Role === "admin") {
		const { orderId } = req.body;
		const { user_id, order_status }: any = await Database.Order.findOne({
			where: { id: orderId },
			raw: true,
		});
		if (order_status !== "in cook") {
			return res.status(400).send({ error: "you can't skip the cook stage" });
		}
		Database.Order.update(
			{ order_status: "delivered" },
			{
				where: {
					id: orderId,
				},
			}
		).then(() => {
			const SocketIoInstance: Server<
				DefaultEventsMap,
				DefaultEventsMap,
				DefaultEventsMap
			> = req.app.get("SocketIoService").GetInstance();
			console.log(user_id);
			SocketIoInstance.to(user_id).emit(
				"order_status_update",
				orderId,
				"delivered"
			);
			res.status(200).json({ message: "marked as delivered" }).end();
		});
	} else {
		res.status(403).json({ error: "unauthorized as admin" }).end();
	}
};

export const order_in_cook = async (req: Request, res: Response) => {
	if (req.User.Role === "admin") {
		const { orderId } = req.body;
		const { user_id }: any = await Database.Order.findOne({
			where: { id: orderId },
			raw: true,
		});
		Database.Order.update(
			{ order_status: "in cook" },
			{
				where: {
					id: orderId,
				},
			}
		).then(() => {
			const SocketIoInstance: Server<
				DefaultEventsMap,
				DefaultEventsMap,
				DefaultEventsMap
			> = req.app.get("SocketIoService").GetInstance();
			console.log(user_id);
			SocketIoInstance.to(user_id).emit(
				"order_status_update",
				orderId,
				"in cook"
			);
			res.status(200).json({ message: "marked as in cook" }).end();
		});
	} else {
		res.status(403).json({ error: "unauthorized as admin" }).end();
	}
};
