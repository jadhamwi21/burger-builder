import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
	closeMenu,
	selectMakeAnOrder,
	selectMyOrders,
} from "../../../slices/menu";
import { RootState } from "../../../store/store";
import { MenuSelections } from "../../../types/types";

interface Props {
	selectionName: MenuSelections;
}

const MenuItem = ({ selectionName }: Props) => {
	const isSelected = useSelector(
		(state: RootState) => state.menuReducer.SelectedMenuOption === selectionName
	);
	const dispatch = useDispatch();

	console.log(selectionName, isSelected);
	return (
		<ListItem
			onClick={() => {
				if (selectionName === MenuSelections.MakeAnOrder) {
					dispatch(selectMakeAnOrder());
				} else {
					dispatch(selectMyOrders());
				}
				dispatch(closeMenu());
			}}
			active={isSelected}
		>
			{selectionName}
		</ListItem>
	);
};
const ListItem = styled.li<{ active: boolean }>`
	width: 100%;
	height: fit-content;
	text-align: center;
	padding: 1em 0px;
	transition: all 0.3s ease-out;
	background-color: ${(props) => (props.active ? "#3f3f3f" : "transparent")};
	color: white;
	cursor: pointer;
	margin: 1em 0px;
	user-select: none;
`;

export default MenuItem;
