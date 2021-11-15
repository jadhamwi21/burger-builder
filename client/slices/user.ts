import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole, UserState } from "../types/types";

const initialState: UserState = {
	isVerified: null,
	Role: null,
	isAuthenticated: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsVerified: (state: UserState, action: PayloadAction<boolean>) => {
			state.isVerified = action.payload;
		},
		setRole: (state: UserState, action: PayloadAction<UserRole>) => {
			state.Role = action.payload;
		},
		setUser: (state: UserState, action: PayloadAction<Partial<UserState>>) => {
			return { ...state, ...action.payload };
		},
		setIsAuthenticated: (state: UserState, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		resetUser: () => initialState,
	},
});

export const userReducer = userSlice.reducer;

export const {
	setIsVerified,
	setRole,
	setUser,
	setIsAuthenticated,
	resetUser,
} = userSlice.actions;
