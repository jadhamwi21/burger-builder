import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import useValidationToggle from "./useValidationToggle";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import { Delay } from "../helper/functions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const FormSchema = yup.object({
	firstName: yup.string().required("First Name Is Required"),
	lastName: yup.string().required("Last Name Is Required"),
	email: yup
		.string()
		.email("Email Must Be Valid")
		.required("Email Is Required"),
	password: yup
		.string()
		.min(8, "Password Must Be At Least 8 Characters")
		.required("Password Is Required"),
	confirmPassword: yup
		.string()
		.required("Confirm Password Is Required")
		.oneOf([yup.ref("password"), null], "Password Must Match"),
	gender: yup
		.string()
		.required("Must Provide A Gender")
		.equals(["Male", "Female"], "Must Be Male Or Female"),
});

const useSignUp = () => {
	const { Validation, Toggler } = useValidationToggle();
	const [signupSuccess, setSignupSuccess] = useState(false);
	const [SignupError, setSignupError] = useState("");
	const {
		handleSubmit,
		handleChange,
		values,
		setFieldValue,
		errors,
		isSubmitting,
	} = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			gender: "",
		},
		enableReinitialize: true,
		validateOnChange: Validation,
		validateOnBlur: false,
		validationSchema: FormSchema,
		onSubmit: (values, { setSubmitting }) => {
			axios
				.post("https://burger-builder2.herokuapp.com/user/signup", {
					...values,
				})
				.then((res: AxiosResponse<any>) => {
					console.log(res.data);
					setSignupSuccess(true);
				})
				.catch((e) => {
					setSignupError(e.response.data.error);
					window.scrollTo(0, 0);
					setSubmitting(false);
				});
		},
	});
	useEffect(() => {
		if (values.gender === "male" || values.gender === "female") {
			setFieldValue(
				"gender",
				values.gender[0].toUpperCase() + values.gender.substring(1)
			);
		}
	}, [values.gender]);
	return {
		handleChange,
		handleSubmit,
		Toggler,
		values,
		setFieldValue,
		errors,
		isSubmitting,
		signupSuccess,
		setSignupSuccess,
		SignupError,
	};
};

export default useSignUp;
