import { Model, ModelCtor, Sequelize } from "sequelize/types";
import { SequelizeMethod } from "sequelize/types/lib/utils";

export type PortType = string | number;

export interface SignupFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: "Male" | "Female";
}

export interface DatabaseInstanceType {
	sequelize: Sequelize;
	Sequelize: SequelizeMethod;
	User: ModelCtor<Model<any, any>>;
}
export type OrderStatusType = "cancelled" | "pending" | "delivered";

export type UserRole = "admin" | "customer";
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

export interface SingleOrder {
	OrderId: string;
	OrderName: string;
	OrderStatus: OrderStatusType;
	OrderAddress: string;
	Burgers: Burger[];
}
