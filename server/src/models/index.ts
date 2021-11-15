import { Sequelize } from "sequelize";
import { burgerModel } from "./burgerModel";
import { toppingModel } from "./toppingModel";
import { orderModel } from "./orderModel";
import { userModel } from "./userModel";

export const sequelize = new Sequelize(
	"postgres://xglfmvlvlusegy:e5984270dbc3f8cda9fa1c87fe06d94be576051e0418c15bc08ea0ab133e801b@ec2-34-194-100-156.compute-1.amazonaws.com:5432/d2oatace92thbh",
	{
		dialect: "postgres",
		protocol: "postgres",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	}
);

export const Database = {
	sequelize,
	Sequelize,
	Order: orderModel(sequelize, Sequelize),
	User: userModel(sequelize, Sequelize),
	Burger: burgerModel(sequelize, Sequelize),
	Topping: toppingModel(sequelize, Sequelize),
};
