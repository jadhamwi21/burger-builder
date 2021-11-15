import { Express } from "express";
import { CurrentUser, UserRole } from "../../src/types/types";

declare global {
	namespace Express {
		interface Request {
			User: {
				Role: "admin" | "customer";
				Id: string;
				isVerified: boolean;
			};
		}
	}
}
