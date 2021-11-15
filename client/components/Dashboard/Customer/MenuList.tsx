import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store/store";
import { MenuSelections } from "../../../types/types";
import MenuItem from "./MenuItem";

interface Props {}

const MenuList = (props: Props) => {
	const { MenuToggled } = useSelector((state: RootState) => ({
		MenuToggled: state.menuReducer.MenuToggled,
	}));
	return (
		<Container className={MenuToggled ? "menu_open" : "menu"}>
			<ListContainer>
				<MenuItem selectionName={MenuSelections.MakeAnOrder} />
				<MenuItem selectionName={MenuSelections.MyOrders} />
			</ListContainer>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	height: calc(100vh - 90px);
	width: 300px;
	transition: all 0.35s ease-out;
	top: 0;
	left: 100%;
	background-color: #181818;
	display: grid;
	place-items: center;
	z-index: 5;
	@media (max-width: 768px) {
		position: fixed;
		height: 100%;
	}
`;
const ListContainer = styled.ul`
	list-style: none;
	padding: 0px;
	width: 100%;
	height: fit-content;
`;

export default MenuList;
