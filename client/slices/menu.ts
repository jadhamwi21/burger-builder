import { createSlice } from "@reduxjs/toolkit";
import { MenuSelections } from "../types/types";

interface StateInterface {
	MenuToggled: boolean;
	SelectedMenuOption: MenuSelections;
}

const initialState: StateInterface = {
	MenuToggled: false,

	SelectedMenuOption: MenuSelections.MakeAnOrder,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		closeMenu: (state: StateInterface) => {
			state.MenuToggled = false;
		},
		openMenu: (state: StateInterface) => {
			state.MenuToggled = true;
		},
		toggleMenu: (state: StateInterface) => {
			state.MenuToggled = !state.MenuToggled;
		},
		selectMakeAnOrder: (state: StateInterface) => {
			state.SelectedMenuOption = MenuSelections.MakeAnOrder;
		},
		selectMyOrders: (state: StateInterface) => {
			state.SelectedMenuOption = MenuSelections.MyOrders;
		},
	},
});

export const menuReducer = menuSlice.reducer;

export const {
	closeMenu,
	openMenu,
	toggleMenu,
	selectMakeAnOrder,

	selectMyOrders,
} = menuSlice.actions;
