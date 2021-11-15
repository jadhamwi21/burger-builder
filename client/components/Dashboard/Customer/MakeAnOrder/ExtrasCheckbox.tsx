import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import { BurgerContext } from "./BurgerBuilder";

interface Props {
	label: "Fries" | "Coke";
}

const ExtrasCheckbox = ({ label }: Props) => {
	const { FriesClickHandler, CokeClickHandler } = useContext(BurgerContext);
	const isChecked = useSelector((state: RootState) => {
		if (label === "Coke") {
			return state.burgerReducer.withCoke;
		} else {
			return state.burgerReducer.withFries;
		}
	});
	const clickHandler = () => {
		if (label === "Fries") {
			FriesClickHandler();
		} else {
			CokeClickHandler();
		}
	};

	return (
		<Wrapper>
			<Checkbox
				checked={isChecked}
				onClick={clickHandler}
				id={label}
				type="checkbox"
			/>
			<Label htmlFor={label}>{label}</Label>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 0.5em 0px;
	width: 80px;
`;

const Checkbox = styled.input`
	@media (max-width: 768px) {
		padding: 1em;
	}
`;

const Label = styled.label`
	display: block;
	text-align: left;
	width: 50px;
	color: white;
	@media (max-width: 768px) {
		padding-left: 0.5em;
		padding-bottom: 0.2em;
	}
`;

export default ExtrasCheckbox;
