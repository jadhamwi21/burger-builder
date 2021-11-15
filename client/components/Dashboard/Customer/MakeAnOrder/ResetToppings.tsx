import React, { useContext } from "react";
import styled from "styled-components";
import { BurgerContext } from "./BurgerBuilder";

const ResetToppings = () => {
	const { ResetToppings } = useContext(BurgerContext);
	return <Reset onClick={ResetToppings}>reset</Reset>;
};

const Reset = styled.div`
	text-decoration: underline;
	color: white;
	font-size: 18px;
	margin: 1em 0px;
	cursor: pointer;
`;

export default ResetToppings;
