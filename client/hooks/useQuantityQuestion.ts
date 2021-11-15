import { useFormik } from "formik";
import React from "react";
import useValidationToggle from "./useValidationToggle";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setBurgersQuantity, setStep } from "../slices/order";
import { OrderStep } from "../types/types";

const FormSchema = yup.object({
	quantity: yup
		.number()
		.min(1, "At least, the quantity should be 1")
		.max(50, "50 is the maximum ammount of burgers you can order")
		.required("you must provide quantity"),
});

const useQuantityQuestion = () => {
	const { Validation, Toggler } = useValidationToggle();
	const dispatch = useDispatch();
	const { handleChange, values, handleSubmit, errors } = useFormik({
		validateOnChange: Validation,
		validateOnBlur: false,
		enableReinitialize: true,
		validationSchema: FormSchema,
		initialValues: {
			quantity: "",
		},
		onSubmit: (values) => {
			dispatch(setBurgersQuantity(parseInt(values.quantity)));
			dispatch(setStep(OrderStep.BuildOrder));
		},
	});

	return { values, handleChange, handleSubmit, Toggler, errors };
};

export default useQuantityQuestion;
