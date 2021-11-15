import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/user";
import { menuReducer } from "../slices/menu";
import { orderReducer } from "../slices/order";
import { burgerReducer } from "../slices/burger";

export const store = configureStore({
	reducer: {
		userReducer,
		menuReducer,
		orderReducer,
		burgerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
