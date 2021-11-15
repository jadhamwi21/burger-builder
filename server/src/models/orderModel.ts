import { DataTypes, Sequelize } from "sequelize";
import { SequelizeMethod } from "sequelize/types/lib/utils";

export const orderModel = (
	sequelize: Sequelize,
	Sequelize: SequelizeMethod
) => {
	const Order = sequelize.define(
		"Order",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			order_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			order_address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			order_status: {
				type: DataTypes.ENUM("pending", "cancelled", "delivered","in cook"),
				allowNull: false,
			},
		},
		{
			paranoid: false,
			underscored: false,
			freezeTableName: true,
			tableName: "Order",
		}
	);
	return Order;
};
