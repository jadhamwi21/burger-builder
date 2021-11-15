import { IObserver } from "./Observer";
import { Notify } from "./types";

interface ISubject {
	attach: (obs: IObserver) => void;
	detach: (obs: IObserver) => void;
	notifyAll: (notify: Notify) => void;
}

class OrdersSubject implements ISubject {
	private observers: IObserver[];
	public constructor() {
		this.observers = [];
	}
	public attach(obs: IObserver) {
		console.log("attached ", obs.getId());
		this.observers.push(obs);
	}
	public detach(obs: IObserver) {
		console.log("detatched ", obs.getId());
		this.observers = this.observers.filter(
			(observer) => obs.getId() !== observer.getId()
		);
	}
	public notifyAll(notifyAction: Notify) {
		this.observers.forEach((observer) => observer.update(notifyAction));
	}
}

// this instance will be used in controllers, so it can notify all logged in admins with realtime data such as : new orders - order status update.
export const OrdersSubjectInstance = new OrdersSubject();
