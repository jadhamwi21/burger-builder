import { useFormik } from "formik";
import React, { KeyboardEvent, useEffect, useState } from "react";
import useValidationToggle from "./useValidationToggle";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resetBurgerState } from "../slices/burger";
import { resetOrderState, setStep } from "../slices/order";
import { OrderStep } from "../types/types";

const FormSchema = yup.object({
	orderName: yup.string().required("You must provide a name for the order"),
	orderAddress: yup
		.string()
		.required("The order can't be submitted without providing an address"),
});

const initialValues = {
	orderName: "",
	orderAddress: "",
};

const useOrderForm = () => {
	const Burgers = useSelector((state: RootState) => state.orderReducer.Burgers);
	const { Validation, Toggler } = useValidationToggle();
	const dispatch = useDispatch();
	const { values, errors, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues,
			validateOnBlur: false,
			validateOnChange: Validation,
			enableReinitialize: true,
			validationSchema: FormSchema,
			onSubmit: async (values) => {
				await new Promise((resolve, reject) => {
					axios
						.post(
							"https://burger-builder2.herokuapp.com/order/create",
							{
								orderName: values.orderName,
								orderAddres: values.orderAddress,
								Burgers: Burgers,
							},
							{ withCredentials: true }
						)
						.then(() => {
							resolve(dispatch(setStep(OrderStep.Submitted)));
						})
						.catch((e) => {
							console.log(e.response.data);
							reject(e);
						});
				});
			},
		});

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		isSubmitting,
		Toggler,
	};
};

export default useOrderForm;
