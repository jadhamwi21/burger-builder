import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetBurgerState } from "../../../../slices/burger";
import { resetOrderState } from "../../../../slices/order";

interface Props {}

const Submitted = (props: Props) => {
	const dispatch = useDispatch();
	return (
		<Container>
			<Wrapper>
				<OrderSubmittedText>Order Submitted</OrderSubmittedText>
				<OkButton
					onClick={() => {
						dispatch(resetBurgerState());
						dispatch(resetOrderState());
					}}
				>
					OK
				</OkButton>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 90px);
	display: grid;
	place-items: Center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const OrderSubmittedText = styled.h3`
	color: white;
`;

const OkButton = styled.button`
	display: block;
	border: none;
	outline: none;
	padding: 1em;
	border-radius: 8px;

	cursor: pointer;
`;

export default Submitted;
