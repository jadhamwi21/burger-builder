import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Burger, OrderStep, SetBurgerQuantityPayload } from "../types/types";

interface StateInterface {
	BurgersQuantity: number | null;
	Burgers: Burger[];
	Step: OrderStep;
}

const initialState: StateInterface = {
	BurgersQuantity: null,
	Burgers: [],
	Step: OrderStep.QuantityQuestion,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setBurgersQuantity: (
			state: StateInterface,
			action: PayloadAction<SetBurgerQuantityPayload>
		) => {
			state.BurgersQuantity = action.payload;
		},
		appendNewBurger: (state: StateInterface, action: PayloadAction<Burger>) => {
			state.Burgers.push(action.payload);
		},
		setStep: (state: StateInterface, action: PayloadAction<OrderStep>) => {
			state.Step = action.payload;
		},
		resetOrderState: () => {
			return initialState;
		},
	},
});

export const orderReducer = orderSlice.reducer;

export const { setBurgersQuantity, setStep, appendNewBurger, resetOrderState } =
	orderSlice.actions;
