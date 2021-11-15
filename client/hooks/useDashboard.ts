import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../pages/_app";
import { setUser } from "../slices/user";
import { RootState } from "../store/store";

const useDashboard = () => {
	const Authenticated = useSelector(
		(state: RootState) => state.userReducer.isAuthenticated
	);
	const [cookies, setCookie, removeCookie] = useCookies(["remember_me"]);
	const [processing, setProcessing] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			if (cookies.remember_me === "true" && !Authenticated) {
				axios
					.get("https://burger-builder2.herokuapp.com/user/details", {
						withCredentials: true,
					})
					.then((res) => {
						const { isVerified, Role, id } = res.data;
						socket.emit("join-room", id);
						dispatch(setUser({ isVerified, Role, isAuthenticated: true }));
						setProcessing(false);
					});
			} else {
				setProcessing(false);
			}
		})();
	}, []);

	return {
		Processing: processing,
		Authenticated,
	};
};

export default useDashboard;
