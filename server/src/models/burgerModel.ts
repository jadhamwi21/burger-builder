import { Sequelize, DataTypes } from "sequelize";
import { SequelizeMethod } from "sequelize/types/lib/utils";

export const burgerModel = (
	sequelize: Sequelize,
	Sequelize: SequelizeMethod
) => {
	const Burger = sequelize.define(
		"Burger",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			fries: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			coke: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			paranoid: false,
			underscored: false,
			freezeTableName: true,
			tableName: "Burger",
		}
	);

	return Burger;
};
