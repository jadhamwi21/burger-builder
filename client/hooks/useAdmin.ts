import axios from "axios";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { socket } from "../pages/_app";
import { SingleOrderType } from "../types/types";

export enum FilterEnum {
	ClearDelivered,
	ClearCancelled,
	ClearPending,
	ClearAll,
	ClearInCook,
}

export interface StateInterface {
	Orders: SingleOrderType[];
	Error: boolean;
	Loading: boolean;
}

export enum ActionTypes {
	Store,
	ErrorOccurred,
	Update,
	Append,
}

const initialState: StateInterface = {
	Orders: [],
	Error: false,
	Loading: true,
};

const AdminReducer = (
	state: StateInterface,
	action: { type: ActionTypes; payload?: any }
): StateInterface => {
	switch (action.type) {
		case ActionTypes.Store:
			return { ...state, Loading: false, Orders: action.payload.orders };
		case ActionTypes.ErrorOccurred:
			return { ...state, Loading: false, Error: true };
		case ActionTypes.Append:
			return { ...state, Orders: [...state.Orders, action.payload.order] };
		case ActionTypes.Update:
			return {
				...state,
				Orders: [...state.Orders].map((order) => {
					if (order.OrderId === action.payload.order.OrderId) {
						return action.payload.order;
					} else {
						return order;
					}
				}),
			};
		default:
			return state;
	}
};

const useAdmin = () => {
	const [{ Orders, Error, Loading }, dispatch] = useReducer(
		AdminReducer,
		initialState
	);
	const OrdersRef = useRef<SingleOrderType[]>([]);
	useEffect(() => {
		OrdersRef.current = Orders;
	}, [Orders]);
	const Filters = useCallback(
		(Filter: FilterEnum) => {
			if (Filter === FilterEnum.ClearAll) {
				return () => {
					dispatch({
						type: ActionTypes.Store,
						payload: {
							orders: [],
						},
					});
				};
			} else {
				return () => {
					const oldOrders = [...OrdersRef.current];
					const ordersFiltered = oldOrders.filter((order) => {
						if (Filter === FilterEnum.ClearCancelled) {
							return order.OrderStatus !== "cancelled";
						} else if (Filter === FilterEnum.ClearDelivered) {
							return order.OrderStatus !== "delivered";
						} else if (Filter === FilterEnum.ClearInCook) {
							return order.OrderStatus !== "in cook";
						} else {
							return order.OrderStatus !== "pending";
						}
					});
					dispatch({
						type: ActionTypes.Store,
						payload: {
							orders: ordersFiltered,
						},
					});
				};
			}
		},
		[OrdersRef.current]
	);
	useEffect(() => {
		const getAllOrders = async () => {
			return new Promise((resolve, reject) => {
				axios
					.get("https://burger-builder2.herokuapp.com/order/get_all", {
						withCredentials: true,
					})
					.then((res) => {
						const { data } = res;
						resolve(
							dispatch({
								type: ActionTypes.Store,
								payload: {
									orders: data,
								},
							})
						);
					})
					.catch((e) => {
						dispatch({
							type: ActionTypes.ErrorOccurred,
						});
						reject(e);
					});
			});
		};
		getAllOrders().then(() => {
			axios
				.post(
					"https://burger-builder2.herokuapp.com/order/subscribe",
					{},
					{ withCredentials: true }
				)
				.then(() => {
					socket.emit("subscribe");
					socket.on("new_order", (order: SingleOrderType) => {
						dispatch({
							type: ActionTypes.Append,
							payload: {
								order,
							},
						});
					});
					socket.on(
						"order_status_update",
						(orderId: string, orderStatus: string) => {
							const oldOrders = [...OrdersRef.current];
							const newOrders = oldOrders.map((Order) => {
								if (Order.OrderId === orderId) {
									return { ...Order, OrderStatus: orderStatus };
								} else {
									return Order;
								}
							});

							dispatch({
								type: ActionTypes.Store,
								payload: {
									orders: newOrders,
								},
							});
						}
					);
				});
		});
	}, []);

	return {
		Orders,
		Error,
		Loading,
		FiltersHandler: Filters,
		Dispatcher: dispatch,
	};
};

export default useAdmin;
