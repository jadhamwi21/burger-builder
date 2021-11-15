export type Review = {
	reviewContent: string;
	reviewOwner: string;
};

export type ReviewsType = Review[];

export interface TokenPayloadInterface {
	id: string;
	isVerified: boolean;
}

export enum MenuSelections {
	MakeAnOrder = "Make An Order",
	MyOrders = "My Orders",
}

export enum OrderStep {
	QuantityQuestion,
	BuildOrder,
	OrderForm,
	Submitted,
}

export type SetBurgerQuantityPayload = number;

export type Topping =
	| "Bacon"
	| "Cheese"
	| "Egg"
	| "Jalapeno"
	| "Ketchup"
	| "Lettuce"
	| "Mushrooms"
	| "Mustard"
	| "Onions"
	| "Tomatto";

export interface Burger {
	BurgerToppings: Topping[];
	withFries: boolean;
	withCoke: boolean;
}

export type UserRole = "admin" | "customer" | null;

export interface UserState {
	isVerified: boolean | null;
	Role: UserRole;
	isAuthenticated: boolean;
}

export interface SingleOrderType {
	OrderAddress: string;
	OrderId: string;
	OrderName: string;
	OrderStatus: "pending" | "delivered" | "cancelled" | "in cook";
	Burgers: Burger[];
}

export type Orders = SingleOrderType[];
