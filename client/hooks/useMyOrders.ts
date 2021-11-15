import axios, { AxiosError } from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { Delay } from "../helper/functions";
import { socket } from "../pages/_app";
import { Orders, SingleOrderType } from "../types/types";

enum ActionTypes {
	Fetch,
	Store,
	Error,
	SetOrderInView,
}

const initialState: {
	Orders: Orders;
	Loading: boolean;
	Error: boolean | Error | AxiosError;
	OrderInView: null | SingleOrderType;
} = {
	Orders: [],
	Loading: true,
	Error: false,
	OrderInView: null,
};

const OrdersReducer = (
	state: typeof initialState,
	action: { type: ActionTypes; payload?: any }
): typeof initialState => {
	switch (action.type) {
		case ActionTypes.Fetch:
			return { ...state, Loading: true };
		case ActionTypes.Store:
			return { ...state, Orders: action?.payload.orders, Loading: false };
		case ActionTypes.Error:
			return { ...state, Loading: false, Error: action?.payload.error };
		case ActionTypes.SetOrderInView:
			return { ...state, OrderInView: action.payload.order };
		default:
			return state;
	}
};

const useMyOrders = () => {
	const [state, dispatch] = useReducer(OrdersReducer, initialState);
	const OrdersRef = useRef(state.Orders);
	useEffect(() => {
		(async () => {
			dispatch({ type: ActionTypes.Fetch });
			await Delay(2);
			axios
				.get("https://burger-builder2.herokuapp.com/order/my", {
					withCredentials: true,
				})
				.then((res) => {
					const { data }: any = res;
					dispatch({
						type: ActionTypes.Store,
						payload: {
							orders: data.Orders.reverse(),
						},
					});
					socket.on(
						"order_status_update",
						(orderId: string, orderStatus: string) => {
							console.log(orderId, orderStatus);
							const oldOrders = [...OrdersRef.current];
							const newOrders = oldOrders.map((order) => {
								if (order.OrderId === orderId) {
									return { ...order, OrderStatus: orderStatus };
								} else {
									return order;
								}
							});
							dispatch({
								type: ActionTypes.Store,
								payload: { orders: newOrders },
							});
						}
					);
				})
				.catch((e) => {
					dispatch({ type: ActionTypes.Error, payload: { error: e } });
				});
		})();
	}, []);

	useEffect(() => {
		OrdersRef.current = state.Orders;
	}, [state.Orders]);

	const onView = (order: SingleOrderType) => {
		dispatch({
			type: ActionTypes.SetOrderInView,
			payload: {
				order,
			},
		});
	};

	const closeView = () => {
		dispatch({
			type: ActionTypes.SetOrderInView,
			payload: {
				order: null,
			},
		});
	};

	const onCancel = async (orderToCancel: SingleOrderType) => {
		const mutatedOrders = [...state.Orders].filter(
			(order) => order.OrderId !== orderToCancel.OrderId
		);
		await axios
			.put(
				"https://burger-builder2.herokuapp.com/order/cancel",
				{
					orderId: orderToCancel.OrderId,
				},
				{
					withCredentials: true,
				}
			)
			.catch((e) => console.log(e.response.data));
		dispatch({
			type: ActionTypes.Store,
			payload: {
				orders: mutatedOrders,
			},
		});
	};

	return {
		state,
		onCancel,
		onView,
		closeView,
	};
};

export default useMyOrders;
