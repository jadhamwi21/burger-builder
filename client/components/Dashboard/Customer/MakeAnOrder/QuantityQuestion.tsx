import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useQuantityQuestion from "../../../../hooks/useQuantityQuestion";
import { setBurgersQuantity, setStep } from "../../../../slices/order";
import { OrderStep } from "../../../../types/types";
import InputComponent from "../../../Shared/InputComponent";

interface Props {}

const QuantityQuestion = (props: Props) => {
	const { values, handleChange, handleSubmit, Toggler, errors } =
		useQuantityQuestion();
	return (
		<Form
			onSubmit={(e) => {
				Toggler();
				handleSubmit(e);
			}}
		>
			<Wrapper>
				<Question>How Many Burgers?</Question>
				<InputComponent
					value={values.quantity}
					name="quantity"
					onChange={handleChange}
					error={errors.quantity}
				/>
			</Wrapper>
		</Form>
	);
};
const Form = styled.form`
	height: 100%;
	width: 100%;
	display: grid;
	place-items: center;
	background-color: #0e0e0e;
	color: white;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Question = styled.h3``;

export default QuantityQuestion;
