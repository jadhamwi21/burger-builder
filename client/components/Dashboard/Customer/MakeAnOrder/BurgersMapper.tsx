import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import BurgerDetails from "./BurgerDetails";

const BurgersMapper = () => {
	const Burgers = useSelector((state: RootState) => state.orderReducer.Burgers);
	return (
		<Flexbox>
			{Burgers.map((burger, i) => (
				<BurgerDetails burger={burger} key={i} />
			))}
		</Flexbox>
	);
};

const Flexbox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: fit-content;
	margin: 3em auto;
	height: fit-content;
	color: white;
`;

export default BurgersMapper;
