import { Router } from "express";
import {
	get_details,
	login_user,
	logout,
	refresh_cookies,
	resend_verification_email,
	signup_user,
	verify_email,
} from "../controllers/userController";
import { authorization } from "../middlewares/authorization";

export const userRouter = Router();

userRouter.post("/signup", signup_user);

userRouter.get("/verification/:token", verify_email);

userRouter.post("/login", login_user);

userRouter.get("/resend_verification_email", resend_verification_email);

userRouter.get("/refresh_cookies", refresh_cookies);

userRouter.delete("/logout", authorization, logout);

userRouter.get("/details", authorization, get_details);
