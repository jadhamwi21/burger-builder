import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import { BurgerContext } from "./BurgerBuilder";
import BurgerContentDisplayer from "./BurgerContentDisplayer";
import ExtraSelections from "./ExtraSelections";
import NextBurgerButton from "./NextBurgerButton";
import Resets from "./Resets";
import ResetToppings from "./ResetToppings";
import StartOver from "./StartOver";

const Burger = () => {
	const { burgerNumber } = useContext(BurgerContext);
	const Quantity = useSelector(
		(state: RootState) => state.orderReducer.BurgersQuantity
	);

	const BurgerBuildingProcessTrackContent =
		(burgerNumber === Quantity! + 1 ? burgerNumber - 1 : burgerNumber) +
		`/ ${Quantity}`;
	return (
		<Container>
			<BurgerBuildingProcessTrack>
				Build Burger {BurgerBuildingProcessTrackContent}
			</BurgerBuildingProcessTrack>
			<ExtraSelections />
			<BurgerContentDisplayer />
			<Resets />
			<NextBurgerButton />
		</Container>
	);
};

const Container = styled.div`
	height: calc(100vh - 90px);
	width: 100%;
	padding: 4em;
	padding-left: 15em;
	background-color: transparent;
	@media (max-width: 768px) {
		width: 100%;
		height: fit-content;
		padding: 0px;
		padding-left: 0.75em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		overflow-y: hidden;
	}
`;

const BurgerBuildingProcessTrack = styled.div`
	width: 100%;
	height: fit-content;
	text-align: center;
	margin: 1em 0px;
	color: white;
`;

export default Burger;
