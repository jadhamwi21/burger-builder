import React from "react";
import styled from "styled-components";
import useOrderForm from "../../../../hooks/useOrderForm";
import InputComponent from "../../../Shared/InputComponent";
import BurgersMapper from "./BurgersMapper";
import StartOver from "./StartOver";
import SubmitOrderButton from "./SubmitOrderButton";

const OrderForm = () => {
	const { handleChange, handleSubmit, values, errors, Toggler, isSubmitting } =
		useOrderForm();
	return (
		<Container>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					if (isSubmitting) {
						return;
					}
					Toggler();
					handleSubmit(e);
				}}
			>
				<InputComponent
					label="Order Name"
					labelColor="white"
					name="orderName"
					value={values.orderName}
					onChange={handleChange}
					error={errors.orderName}
				/>
				<InputComponent
					label="Address"
					labelColor="white"
					name="orderAddress"
					value={values.orderAddress}
					onChange={handleChange}
					error={errors.orderAddress}
				/>
				<BurgersMapper />
				<SubmitOrderButton />
				<StartOver />
			</Form>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;
	color: white;
	overflow-y: auto;
	overflow-x: hidden;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: fit-content;
	padding-bottom: 1em;
`;

export default OrderForm;
