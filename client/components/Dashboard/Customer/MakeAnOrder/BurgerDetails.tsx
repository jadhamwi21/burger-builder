import React from "react";
import styled from "styled-components";
import { BooleanToYesOrNo } from "../../../../helper/functions";
import { Burger } from "../../../../types/types";

interface Props {
	burger: Burger;
}

const BurgerDetails = ({ burger }: Props) => {
	return (
		<Container>
			<FlexBox>
				<Toppings>
					{burger.BurgerToppings.map((topping) => (
						<SingleTopping key={topping}>{topping}</SingleTopping>
					))}
				</Toppings>
				<Extras>
					<SingleExtra>
						Fries : {BooleanToYesOrNo(burger.withFries)}
					</SingleExtra>
					<SingleExtra>Coke : {BooleanToYesOrNo(burger.withCoke)}</SingleExtra>
				</Extras>
			</FlexBox>
		</Container>
	);
};
const Container = styled.div`
	display: grid;
	place-items: center;
	height: auto;
	min-height: 125px;
	border-radius: 6px;
	width: 300px;
	background-color: white;
	color: black;
	padding: 1em 2em;
	margin: 1em 0px;
	@media (max-width: 768px) {
		max-width: auto;
		width: 100%;
	}
`;

const FlexBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
const Toppings = styled.ul`
	list-style: none;
	padding: 0px;
`;
const SingleTopping = styled.li``;

const Extras = styled.ul`
	list-style: none;
	padding: 0px;
`;
const SingleExtra = styled.li``;

export default BurgerDetails;
