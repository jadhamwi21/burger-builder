import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetBurgerState } from "../../../../slices/burger";
import { resetOrderState } from "../../../../slices/order";
import { BurgerContext } from "./BurgerBuilder";

const StartOver = () => {
	const dispatch = useDispatch();
	return (
		<Reset
			onClick={() => {
				dispatch(resetOrderState());
				dispatch(resetBurgerState());
			}}
		>
			start over
		</Reset>
	);
};

const Reset = styled.div`
	text-decoration: underline;
	color: white;
	font-size: 18px;
	margin: 1em 1em;
	cursor: pointer;
	@media (max-width: 768px) {
		margin-bottom: 4em;
	}
`;

export default StartOver;
