import React, { useContext } from "react";
import styled from "styled-components";
import { BurgerContext } from "./BurgerBuilder";

interface Props {}

const NextBurgerButton = (props: Props) => {
	const { NextBurgerHandler } = useContext(BurgerContext);
	return <NextButton onClick={NextBurgerHandler}>Next</NextButton>;
};

const NextButton = styled.button`
	border: none;
	outline: none;
	padding: 0.5em 1em;
	background-color: #3434ec;
	color: white;
	font-size: 18px;
	border-radius: 6px;
	@media (max-width: 768px) {
		margin: 1em auto;
		display: block;
	}
`;

export default NextBurgerButton;
