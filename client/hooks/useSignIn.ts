import { useFormik } from "formik";

import * as yup from "yup";
import useValidationToggle from "./useValidationToggle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { JWTDecode } from "../helper/functions";
import { socket } from "../pages/_app";
import { resetUser, setUser } from "../slices/user";
import { useEffect, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";

const FormSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const useSignIn = () => {
	const { Validation, Toggler } = useValidationToggle();
	const dispatch = useDispatch();
	const [cookies, setCookie, removeCookie] = useCookies(["remember_me"]);
	const Router = useRouter();
	const {
		handleSubmit,
		handleChange,
		values,
		setFieldValue,
		errors,
		isSubmitting,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		enableReinitialize: true,
		validateOnChange: Validation,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const { email, password, rememberMe } = values;
			await axios
				.post(
					"https://burger-builder2.herokuapp.com/user/login",
					{
						email,
						password,
						rememberMe,
					},
					{
						withCredentials: true,
					}
				)
				.then((res: any) => {
					const { isVerified, Role, id } = res.data;
					socket.emit("join-room", id);
					dispatch(
						setUser({
							isVerified,
							Role,
							isAuthenticated: true,
						})
					);
					Router.push("/dashboard");
				})
				.catch((e) => {
					console.log(e.response.data);
				});
		},
		validationSchema: FormSchema,
	});
	useEffect(() => {
		dispatch(resetUser());
	}, []);
	return {
		handleSubmit,
		handleFieldChange: handleChange,
		handleRememberMe: () => setFieldValue("rememberMe", !values.rememberMe),
		emailValue: values.email,
		passwordValue: values.password,
		rememberMeValue: values.rememberMe,
		FormErrors: errors,
		ValidationToggler: Toggler,
		isSubmitting,
		isLoggedInFromLastSession: cookies.remember_me === "true",
	};
};

export default useSignIn;
