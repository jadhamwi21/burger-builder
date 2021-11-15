import { OrderStatusType, SingleOrder } from "../types/types";

export enum NotifyEnum {
	NewOrder,
	OrderStatusUpdate,
}

interface NotifyNewOrder {
	type: NotifyEnum.NewOrder;
	order: SingleOrder;
}

interface NotifyOrderStatusUpdate {
	type: NotifyEnum.OrderStatusUpdate;
	orderId: string;
	orderStatus: OrderStatusType;
}

export type Notify = NotifyNewOrder | NotifyOrderStatusUpdate;
