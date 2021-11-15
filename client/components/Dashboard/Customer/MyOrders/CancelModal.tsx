import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import useModal from "../../../../hooks/useModal";
import InputComponent from "../../../Shared/InputComponent";
import * as yup from "yup";
import ReactDOM from "react-dom";

const FormSchema = yup.object({
	confirmField: yup
		.string()
		.is(["cancel"], "the input should match 'cancel'")
		.required(),
});

interface Props {
	cancel: () => void;
	closeModal: () => void;
}

const CancelModal = ({ cancel, closeModal }: Props) => {
	const Mounted = useModal();
	const { values, handleChange, handleSubmit, errors } = useFormik({
		validateOnChange: true,
		validateOnBlur: false,
		validationSchema: FormSchema,
		initialValues: {
			confirmField: "",
		},
		onSubmit: (values) => {
			cancel();
		},
	});
	return Mounted
		? ReactDOM.createPortal(
				<Container onClick={closeModal}>
					<Modal onClick={(e) => e.stopPropagation()}>
						<Form onSubmit={handleSubmit}>
							<div>type {"cancel"} in the input field below</div>
							<InputComponent
								name="confirmField"
								value={values.confirmField}
								onChange={handleChange}
								error={errors.confirmField}
							/>
							<SubmitButton type="submit">Submit</SubmitButton>
						</Form>
					</Modal>
				</Container>,
				document.getElementById("portal")!
		  )
		: null;
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: grid;
	place-items: center;
	background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
	background-color: white;
	width: 50%;
	height: fit-content;
	padding: 1em;
	color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Form = styled.form``;

const SubmitButton = styled.button`
	border: none;
	outline: none;
	padding: 0.5em 1em;
	background-color: black;
	color: white;
	border-radius: 6px;
	margin: 0 auto;
	display: block;
`;

export default CancelModal;
