import { Server } from "../../node_modules/socket.io/dist";
import { DefaultEventsMap } from "../../node_modules/socket.io/dist/typed-events";
import { app } from "../app";
import { Notify, NotifyEnum } from "./types";

export interface IObserver {
	update: (notifyAction: Notify) => void;
	getId: () => string;
}

export class Admin implements IObserver {
	private id: string;
	public constructor(id: string) {
		this.id = id;
	}
	public getId() {
		return this.id;
	}
	public update(notifyAction: Notify) {
		const SocketIoService: Server<
			DefaultEventsMap,
			DefaultEventsMap,
			DefaultEventsMap
		> = app.get("SocketIoService").GetInstance();
		if (notifyAction.type === NotifyEnum.NewOrder) {
			SocketIoService.to(this.id).emit("new_order", notifyAction.order);
		} else if (notifyAction.type === NotifyEnum.OrderStatusUpdate) {
			SocketIoService.to(this.id).emit(
				"order_status_update",
				notifyAction.orderId,
				notifyAction.orderStatus
			);
		}
	}
}
