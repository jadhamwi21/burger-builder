import React from "react";
import styled from "styled-components";
import { useBurgerBuilder } from "../../../../hooks/useBurgerBuilder";
import { Topping } from "../../../../types/types";
import Burger from "./Burger";
import OrderTransition from "./OrderTransition";
import ToppingsMenu from "./ToppingsMenu";

const Prefunc = () => {};

export const BurgerContext = React.createContext<{
	CokeClickHandler: () => void;
	FriesClickHandler: () => void;
	NextBurgerHandler: () => void;
	ToppingClickHandler: (topping: Topping) => void;
	ResetToppings: () => void;
	Toppings: Topping[];
	burgerNumber: number;
}>({
	CokeClickHandler: Prefunc,
	FriesClickHandler: Prefunc,
	NextBurgerHandler: Prefunc,
	ToppingClickHandler: Prefunc,
	Toppings: [],
	burgerNumber: 0,
	ResetToppings: Prefunc,
});

const BurgerBuilder = () => {
	const {
		CokeClickHandler,
		FriesClickHandler,
		NextBurgerHandler,
		ToppingClickHandler,
		Toppings,
		burgerNumber,
		ResetToppings,
	} = useBurgerBuilder();
	return (
		<BurgerContext.Provider
			value={{
				CokeClickHandler,
				FriesClickHandler,
				NextBurgerHandler,
				ToppingClickHandler,
				Toppings,
				burgerNumber: burgerNumber + 1,
				ResetToppings,
			}}
		>
			<Wrapper>
				<Burger />
				{/* <OrderTransition motionKey={burgerNumber}> */}
				<ToppingsMenu />
				{/* </OrderTransition> */}
			</Wrapper>
		</BurgerContext.Provider>
	);
};
const Wrapper = styled.div`
	height: fit-content;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: fit-content;
	}
`;

export default BurgerBuilder;
