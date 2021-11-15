import React, { useContext } from "react";
import styled from "styled-components";
import { BurgerContext } from "./BurgerBuilder";

const BurgerContentDisplayer = () => {
	const { Toppings } = useContext(BurgerContext);
	return (
		<Displayer>
			<Content>Burger Content : {["Beef", ...Toppings].join(" - ")}</Content>
		</Displayer>
	);
};
const Displayer = styled.div`
	height: fit-content;
	width: auto;
	text-align: left;
	color: white;
`;

const Content = styled.p`
	width: fit-content;
	height: fit-content;
`;

export default BurgerContentDisplayer;
