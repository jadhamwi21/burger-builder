import { DataTypes, Sequelize } from "sequelize";
import { SequelizeMethod } from "sequelize/types/lib/utils";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export const userModel = (sequelize: Sequelize, Sequelize: SequelizeMethod) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			gender: {
				type: DataTypes.ENUM("Male", "Female", "Unknown"),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			verificationLink: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			role: {
				type: DataTypes.ENUM("customer", "admin"),
				allowNull: false,
			},
		},
		{
			paranoid: false,
			underscored: false,
			freezeTableName: true,
			tableName: "User",
			hooks: {
				beforeCreate: async (user: any) => {
					user.password = (await bcrypt.hash(user.password, 10)).toString();
				},
			},
		}
	);

	return User;
};
