import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants";

export const authorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const JwtToken = req.cookies.jwt as any;
	const { role, id, isVerified }: any = jwt.verify(JwtToken, SECRET_KEY);
	if (id) {
		req.User = {
			Role: role,
			Id: id,
			isVerified,
		};
		return next();
	} else {
		res
			.status(401)
			.json({ message: "can't access this route without sending credentials" })
			.end();
	}
};
