import { DataTypes, Sequelize } from "sequelize";
import { SequelizeMethod } from "sequelize/types/lib/utils";

export const toppingModel = (
	sequelize: Sequelize,
	Sequelize: SequelizeMethod
) => {
	const Topping = sequelize.define(
		"Topping",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			topping: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			paranoid: false,
			underscored: false,
			freezeTableName: true,
			tableName: "Topping",
		}
	);

	return Topping;
};
