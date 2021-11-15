import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { Admin } from "../Observer/Observer";
import { OrdersSubjectInstance } from "../Observer/Subject";
import { UserRole } from "../types/types";

export class SocketIoService {
	private io;
	public constructor(server: HTTPServer) {
		this.io = new Server(server, {
			cors: {
				origin: "https://burger-builder10.netlify.app",
			},
		});
		this.io.on("connection", (socket) => {
			socket.on("join-room", (userId: string) => {
				socket.join(userId);
				console.log("joined room with id", userId);
				socket.on("subscribe", () => {
					const admin = new Admin(userId);
					OrdersSubjectInstance.attach(admin);
					socket.on("disconnect", () => {
						OrdersSubjectInstance.detach(admin);
					});
				});
				socket.on("disconnect", () => {
					console.log("disconnected user id ", userId);
				});
			});
		});
	}
	public GetInstance() {
		return this.io;
	}
}
