import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTopping, removeTopping } from "../../../../slices/burger";
import { RootState } from "../../../../store/store";
import { Topping } from "../../../../types/types";
import { BurgerContext } from "./BurgerBuilder";

interface Props {
	topping: Topping;
}

const MenuTopping = ({ topping }: Props) => {
	const { ToppingClickHandler, Toppings } = useContext(BurgerContext);
	return (
		<Wrapper
			bright={Toppings.indexOf(topping) !== -1}
			onClick={() => ToppingClickHandler(topping)}
		>
			<ToppingLogo src={`./Toppings/${topping}.jpg`} />
			<ToppingName>{topping}</ToppingName>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ bright: boolean }>`
	height: 150px;
	width: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => (props.bright ? "#b8b6b6" : "transparent")};
	margin: 1em 0px;
	border-radius: 6px;
	padding: 2em;
	cursor: pointer;
	transition: all 0.2s ease;
	@media (max-width: 768px) {
		margin: 1.5em;
	}
`;

const ToppingLogo = styled.img`
	height: 100px;
	width: 100px;
	pointer-events: none;
`;

const ToppingName = styled.div`
	color: white;
	font-size: 18px;
`;

export default MenuTopping;
