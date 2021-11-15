import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../pages/_app";
import { setUser } from "../slices/user";
import { UserState } from "../types/types";
import axios from "axios";

const useVerificationListener = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		socket.on("email-verified", (newClientState: Partial<UserState>) => {
			dispatch(setUser(newClientState));
			axios.get("https://burger-builder2.herokuapp.com/user/refresh_cookies", {
				withCredentials: true,
			});
		});
	}, []);
};

export default useVerificationListener;
