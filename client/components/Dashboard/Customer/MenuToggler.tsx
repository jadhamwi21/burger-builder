import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Fade as Hamburger } from "hamburger-react";
import styled from "styled-components";
import { toggleMenu } from "../../../slices/menu";

interface Props {}

const MenuToggler = (props: Props) => {
	const dispatch = useDispatch();
	const MenuToggled = useSelector(
		(state: RootState) => state.menuReducer.MenuToggled
	);
	const MenuToggle = () => {
		dispatch(toggleMenu());
	};
	return (
		<HamburgerWrapper>
			<Hamburger
				toggle={MenuToggle}
				toggled={MenuToggled}
				direction="right"
				size={28}
				color={"white"}
				easing="ease-out"
			/>
		</HamburgerWrapper>
	);
};
const HamburgerWrapper = styled.div`
	height: fit-content;
	width: fit-content;
	position: absolute;
	top: 15px;
	right: 15px;
	z-index: 10;
	@media (max-width: 768px) {
		position: fixed;
	}
`;

export default MenuToggler;
