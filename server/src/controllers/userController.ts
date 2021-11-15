import { Request, Response } from "express";
import { Database } from "../models";
import { SignupFormData } from "../types/types";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import { EMAIL_SECRET, SECRET_KEY } from "../constants";
import bcrypt from "bcrypt";
import { EmailService } from "../services/EmailService";
import { SocketIoService } from "../services/SocketIoService";

export const signup_user = async (req: Request, res: Response) => {
	const { firstName, lastName, gender, password, email }: SignupFormData =
		req.body;
	const userId = uuid();
	const verificationLink = `http://localhost:8080/user/verification/${jwt.sign(
		userId,
		EMAIL_SECRET
	)}`;
	const userDetails = {
		id: userId,
		first_name: firstName,
		last_name: lastName,
		password: password,
		email: email,
		gender: gender,
		is_verified: false,
		verificationLink: verificationLink,
		role: "customer",
	};
	await Database.User.create(userDetails, {
		raw: true,
	})
		.then(() => {
			new EmailService()
				.setSubject("Email Verification")
				.setReceiver(email)
				.setHTML(
					`Click On This Link To Verify Your Account : <a href='${verificationLink}'>Click Here</a>`
				)
				.Send();
			res
				.status(201)
				.json({
					message: "User Successfully Created, You Need To Verify Your Email",
				})
				.end();
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
};

export const verify_email = async (req: Request, res: Response) => {
	const user_id = jwt.verify(req.params.token, EMAIL_SECRET);
	const User: any = await Database.User.findOne({
		where: {
			id: user_id,
		},
	});
	if (User) {
		await User.update({
			is_verified: true,
		});
		const clientStateUpdatePayload = {
			isVerified: true,
		};
		const SocketIoServiceInstance: SocketIoService =
			req.app.get("SocketIoService");
		const SocketIoInstance = SocketIoServiceInstance.GetInstance();
		SocketIoInstance.to(user_id as string).emit(
			"email-verified",
			clientStateUpdatePayload
		);
		res.status(200).json({ message: "Email Verified Successfully" }).end();
	} else {
		res
			.status(500)
			.json({ message: "Couldn't Verify The Email Please Try Again" })
			.end();
	}
};

export const login_user = async (req: Request, res: Response) => {
	const { email, password, rememberMe } = req.body;
	Database.User.findOne({
		where: {
			email,
		},
		raw: true,
	})

		.then((user: any) => {
			bcrypt.compare(password, user.password, (err, doesMatch) => {
				if (doesMatch) {
					const JsonWebToken = jwt.sign(
						{
							id: user.id,
							role: user.role,
							isVerified: user.is_verified,
						},
						SECRET_KEY
					);
					// ~10Years
					const cookieExpirationDate = new Date(
						new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
					); //

					res
						.status(200)
						.cookie("jwt", JsonWebToken, {
							secure: process.env.NODE_ENV !== "development",
							httpOnly: true,
							expires: cookieExpirationDate,
						})
						.cookie("remember_me", rememberMe, {
							expires: cookieExpirationDate,
							httpOnly: false,
						})
						.json({
							isVerified: user.is_verified,
							Role: user.role,
							id: user.id,
						})
						.end();
				} else {
					res.status(401).json({ message: "incorrect password" }).end();
				}
			});
		})
		.catch(() => {
			res
				.status(409)
				.json({ message: "user with this email doesn't exist" })
				.end();
		});
};

export const resend_verification_email = async (
	req: Request,
	res: Response
) => {
	const { id }: any = jwt.verify(req.cookies.jwt as any, SECRET_KEY);
	Database.User.findOne({
		where: {
			id,
		},
		raw: true,
	})
		.then((user: any) => {
			const { email, verificationLink } = user;
			const emailHTML = `Click On This Link To Verify Your Account : <a href='${verificationLink}'>Click Here</a>`;
			console.log(email, verificationLink);
			new EmailService()
				.setSubject("Email Verification")
				.setReceiver(email)
				.setHTML(emailHTML)
				.Send();
			res.status(200).end();
		})
		.catch((e) => {
			console.log(e);
			res.status(404).end();
		});
};

export const refresh_cookies = async (req: Request, res: Response) => {
	const { id }: any = jwt.verify(req.cookies.jwt as any, SECRET_KEY);
	const User: any = await Database.User.findOne({
		where: {
			id: id,
		},
	});
	// ~10Years
	const cookieExpirationDate = new Date(
		new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
	); //

	const newToken = jwt.sign(
		{
			id: User.id,
			role: User.role,
			isVerified: User.is_verified,
		},
		SECRET_KEY
	);
	return res
		.cookie("jwt", newToken, {
			secure: process.env.NODE_ENV !== "development",
			httpOnly: true,
			expires: cookieExpirationDate,
		})
		.end();
};

export const logout = (req: Request, res: Response) => {
	return res.clearCookie("jwt").clearCookie("remember_me").end();
};

export const get_details = (req: Request, res: Response) => {
	const { jwt: JwtCookie } = req.cookies as any;
	const { id }: any = jwt.decode(JwtCookie);
	Database.User.findOne({
		where: {
			id,
		},
		raw: true,
	}).then((User: any) => {
		const { is_verified, role, id } = User;
		res.status(200).json({ isVerified: is_verified, Role: role, id });
	});
};
