import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Burger, Topping } from "../types/types";

const initialState: Burger = {
	BurgerToppings: [],
	withFries: false,
	withCoke: false,
};

const burgerSlice = createSlice({
	name: "burger",
	initialState,
	reducers: {
		toggleFries: (state: Burger) => {
			state.withFries = !state.withFries;
		},
		toggleCoke: (state: Burger) => {
			state.withCoke = !state.withCoke;
		},
		addTopping: (state: Burger, action: PayloadAction<Topping>) => {
			state.BurgerToppings.push(action.payload);
		},
		removeTopping: (state: Burger, action: PayloadAction<Topping>) => {
			const ToppingIndex = state.BurgerToppings.indexOf(action.payload);
			state.BurgerToppings.splice(ToppingIndex, 1);
		},
		resetBurgerState: () => initialState,
	},
});

export const burgerReducer = burgerSlice.reducer;

export const {
	toggleCoke,
	toggleFries,
	addTopping,
	removeTopping,
	resetBurgerState,
} = burgerSlice.actions;
