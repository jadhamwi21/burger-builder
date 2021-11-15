import express, { Application } from "express";
import { userRouter } from "./routers/userRouter";
import { PortType } from "./types/types";
import cors from "cors";
import { Database } from "./models";
import { createServer, Server as HTTPServer } from "http";
import { SocketIoService } from "./services/SocketIoService";
import cookieParser from "cookie-parser";
import { v4 } from "uuid";
import { orderRouter } from "./routers/orderRouter";

class App {
	private app: Application;
	private port: PortType;
	private httpServer: HTTPServer;
	public constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;
		this.app.use(cookieParser());
		this.app.use(express.urlencoded());
		this.app.use(express.json());
		this.app.use(
			cors({
				origin: ["https://burger-builder10.netlify.app"],
				credentials: true,
			})
		);
		this.app.get("/", (req, res) => {
			res.send("Welcome To Burger Builder");
		});
		this.app.use("/order", orderRouter);
		this.app.use("/user", userRouter);
		this.httpServer = createServer(this.app);
		this.app.set("SocketIoService", new SocketIoService(this.httpServer));
	}
	public Run() {
		this.httpServer.listen(this.port, () => {
			console.log(`Listening On Port ${this.port}`);
		});

		Database.User.hasMany(Database.Order, {
			foreignKey: "user_id",
		});
		Database.Order.hasMany(Database.Burger, {
			foreignKey: "order_id",
		});

		Database.Burger.hasMany(Database.Topping, {
			foreignKey: "burger_id",
		});

		Database.sequelize.sync({ force: true }).then(() => {
			Database.User.create({
				id: v4(),
				email: "admin@hotmail.com",
				password: "admin",
				is_verified: true,
				role: "admin",
				gender: "Unknown",
			});
		});

		return this.app;
	}
}

export const app = new App().Run();
