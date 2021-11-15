import { Database } from "../models";
import { Burger, OrderStatusType, SingleOrder, Topping } from "../types/types";
import { v4 } from "uuid";
import { OrdersSubjectInstance } from "../Observer/Subject";
import { NotifyEnum } from "../Observer/types";

export const asyncForEach = async <T>(
	arr: T[],
	cb: (element: T) => Promise<void>
) => {
	for (let i = 0; i < arr.length; i++) {
		await cb(arr[i]);
	}
};

export const ToppingNameToToppingId = (topping: Topping): number => {
	const toppings: { [k: string]: number } = {
		Bacon: 1,
		Cheese: 2,
		Egg: 3,
		Jalapeno: 4,
		Ketchup: 5,
		Lettuce: 6,
		Mushrooms: 7,
		Mustard: 8,
		Onions: 9,
		Tomatto: 10,
	};

	return toppings[topping.toString()];
};

export const CreateOrderInDatabase = async (
	orderName: string,
	orderAddress: string,
	Burgers: Burger[],
	userId: string
) => {
	const Order: any = await Database.Order.create(
		{
			id: v4(),
			order_name: orderName,
			order_address: orderAddress,
			user_id: userId,
			order_status: "pending",
		},
		{
			raw: true,
		}
	);
	const OrderId = Order.id;
	const orderToEmit: SingleOrder = {
		OrderAddress: orderAddress,
		OrderId,
		OrderName: orderName,
		OrderStatus: "pending",
		Burgers,
	};
	OrdersSubjectInstance.notifyAll({
		type: NotifyEnum.NewOrder,
		order: orderToEmit,
	});
	await asyncForEach<Burger>(Burgers, async (Burger) => {
		const StoredBurger: any = await Database.Burger.create(
			{
				id: v4(),
				fries: Burger.withFries,
				coke: Burger.withCoke,
				order_id: OrderId,
			},
			{ raw: true }
		);
		await asyncForEach<Topping>(Burger.BurgerToppings, async (topping) => {
			Database.Topping.create({
				id: v4(),
				topping: topping,
				burger_id: StoredBurger.id,
			});
		});
	});
};

export const GetUserOrders = async (userId: string) => {
	const User = await Database.User.findAll({
		where: {
			id: userId,
		},
		raw: true,
		nest: true,
		include: [
			{
				model: Database.Order,
			},
		],
	});
	const Orders = User.map((user: any) => user.Orders);
	const OrdersArray: SingleOrder[] = [];
	await asyncForEach<{
		id: string;
		order_name: string;
		order_status: OrderStatusType;
		order_address: string;
	}>(Orders, async (Order) => {
		const Burgers: any = await Database.Burger.findAll({
			where: {
				order_id: Order.id,
			},
			raw: true,
			nest: true,
		});
		const OrderBurgers: Burger[] = [];
		await asyncForEach<{ id: string; fries: boolean; coke: boolean }>(
			Burgers,
			async (Burger) => {
				const Toppings: any = await Database.Topping.findAll({
					where: {
						burger_id: Burger.id,
					},
					raw: true,
					nest: true,
				});
				const burger: Burger = {
					withCoke: Burger.coke,
					withFries: Burger.fries,
					BurgerToppings: [],
				};

				Toppings.forEach((topping: { topping: Topping }) => {
					burger.BurgerToppings.push(topping.topping);
				});
				OrderBurgers.push(burger);
			}
		);
		OrdersArray.push({
			OrderAddress: Order.order_address,
			OrderId: Order.id,
			OrderName: Order.order_name,
			OrderStatus: Order.order_status,
			Burgers: OrderBurgers,
		});
	});
	return OrdersArray;
};

export const GetAllOrders = async () => {
	return new Promise((resolve) => {
		Database.Order.findAll({
			nest: true,
			raw: true,
			order: [["createdAt", "ASC"]],
		}).then(async (orders: any) => {
			const OrdersArray: SingleOrder[] = [];
			await asyncForEach<{
				id: string;
				order_name: string;
				order_status: OrderStatusType;
				order_address: string;
			}>(orders, async (Order) => {
				const Burgers: any = await Database.Burger.findAll({
					where: {
						order_id: Order.id,
					},
					raw: true,
					nest: true,
				});
				const OrderBurgers: Burger[] = [];
				await asyncForEach<{ id: string; fries: boolean; coke: boolean }>(
					Burgers,
					async (Burger) => {
						const Toppings: any = await Database.Topping.findAll({
							where: {
								burger_id: Burger.id,
							},
							raw: true,
							nest: true,
						});
						const burger: Burger = {
							withCoke: Burger.coke,
							withFries: Burger.fries,
							BurgerToppings: [],
						};

						Toppings.forEach((topping: { topping: Topping }) => {
							burger.BurgerToppings.push(topping.topping);
						});
						OrderBurgers.push(burger);
					}
				);
				OrdersArray.push({
					OrderAddress: Order.order_address,
					OrderId: Order.id,
					OrderName: Order.order_name,
					OrderStatus: Order.order_status,
					Burgers: OrderBurgers,
				});
			});
			resolve(OrdersArray);
		});
	});
};
